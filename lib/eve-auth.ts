/**
 * EveOnline authentication flow.
 */
require('dotenv').config()
import axios from 'axios'
import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import { createDocument, readDocument, updateDocument } from './mongodb'
import { WithId } from 'mongodb'

const CLIENT_ID: string = process?.env?.EVE_CLIENT_ID || ''
const CLIENT_SECRET: string = process?.env?.EVE_CLIENT_SECRET || ''

const OAUTH_URL = 'https://login.eveonline.com/v2/oauth/'
const AUTH_URL = OAUTH_URL + 'authorize/'
const TOKEN_URL = OAUTH_URL + 'token/'

export const COLLECTION_USERS = 'eveUsers'

interface CodeResponse {
    access_token: string
    expires_in: number
    token_type: string
    refresh_token: string
}

interface UserRecord {
    access_token: string
    expiration: number
    name: string
    playerId: number
    refresh_token: string
}

interface EvePayload {
    scp: string[]
    jti: string
    kid: string
    sub: string
    azp: string
    tenant: string
    tier: string
    region: string
    aud: string
    name: string
    owner: string
    exp: number
    iat: number
    iss: string
}

const SCOPES = [
    'esi-wallet.read_character_wallet.v1',
    'esi-wallet.read_corporation_wallet.v1',
    'esi-assets.read_assets.v1',
    'esi-markets.structure_markets.v1',
    'esi-markets.read_character_orders.v1',
    'esi-wallet.read_corporation_wallets.v1',
    'esi-assets.read_corporation_assets.v1',
    'esi-markets.read_corporation_orders.v1',
]

/**
 * Just a helper function to get the Login Url
 * @param redirect
 */
export const getEveUrl = (redirect: string): string => {
    const url = new URL(AUTH_URL)
    const params: Record<string, string> = {
        response_type: 'code',
        redirect_uri: redirect,
        client_id: CLIENT_ID,
        scope: SCOPES.join(' '),
        state: 'eve-auth',
    }

    for (let paramsKey in params) {
        url.searchParams.set(paramsKey, params[paramsKey])
    }
    return url.toString()
}

/**
 * Part of the oAuth handshake process.
 * @param authorizationCode
 */
export const login = (authorizationCode: string) => {
    const params = {
        grant_type: 'authorization_code',
        code: authorizationCode,
    }

    return axios.post(TOKEN_URL, params, {
        headers: {
            Authorization:
                'Basic ' +
                Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
            Host: 'login.eveonline.com',
        },
    })
}

/**
 * Refreshes a token, revalidates it, and saves it if all is well.
 *
 * @param refresh_token
 */
export const refreshToken = async (refresh_token: string) => {
    const params = {
        grant_type: 'refresh_token',
        refresh_token,
    }

    const { data } = await axios.post(TOKEN_URL, params, {
        headers: {
            Authorization:
                'Basic ' +
                Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
            Host: 'login.eveonline.com',
        },
    })

    const validToken = validateToken(data)

    await updateUser(validToken, data.access_token, refresh_token)

    return data.access_token
}

/**
 * Gets the EvE Online Access token for a user if one is on file.
 * @param userID
 */
export const getUserToken = async (userID: number) => {
    const userRecord = await readDocument(
        { playerId: userID },
        COLLECTION_USERS
    )

    if (!userRecord) {
        throw new Error('Error for user.')
    }

    const { access_token, expiration, refresh_token } =
        userRecord as WithId<UserRecord>

    if (expiration < Math.floor(Date.now() / 1000)) {
        return await refreshToken(refresh_token)
    }

    return access_token
}

export const updateUser = async (
    decoded: EvePayload,
    access_token: string,
    refresh_token: string
) => {
    const sub = decoded.sub.split(':')
    const playerId = parseInt(sub[sub.length - 1])

    // Now write the document.
    const document = {
        access_token,
        refresh_token,
        expiration: decoded.exp as number,
        name: decoded.name,
        playerId: playerId,
    }

    return await updateDocument(
        { playerId: playerId },
        COLLECTION_USERS,
        document
    )
}

/**
 * Validates the Access token using decryption to ensure authenticity.
 *
 * @param response
 */
export const validateToken = async (
    response: CodeResponse
): Promise<EvePayload> => {
    const { access_token } = response
    const client = jwksClient({
        jwksUri: 'https://login.eveonline.com/oauth/jwks',
    })

    const key = await client.getSigningKey('JWT-Signature-Key')
    const signingKey = key.getPublicKey()

    return <EvePayload>jwt.verify(access_token, signingKey, {
        audience: 'EVE Online',
        issuer: ['https://login.eveonline.com', 'login.eveonline.com'],
        ignoreExpiration: true,
    })
}
