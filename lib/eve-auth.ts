/**
 * EveOnline authentication flow.
 */
import axios from 'axios'
import * as jose from 'jose'

const CLIENT_ID: string = process?.env?.EVE_CLIENT_ID || ''
const CLIENT_SECRET: string = process?.env?.EVE_CLIENT_SECRET || ''

const OAUTH_URL = 'https://login.eveonline.com/v2/oauth/'
const AUTH_URL = OAUTH_URL + 'authorize/'
const TOKEN_URL = OAUTH_URL + 'token/'

export const COLLECTION_USERS = 'eveUsers'

export type CodeResponse = {
    access_token: string
    expires_in: number
    token_type: string
    refresh_token: string
}

export type UserRecord = {
    access_token: string
    expiration: number
    name: string
    playerId: number
    refresh_token: string
}

export type EvePayload = {
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
    //
    // await updateUser(validToken, data.access_token, refresh_token)

    return data.access_token
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
    return await validateAccessToken(access_token)
}

export const validateAccessToken = async (
    access_token: string
): Promise<EvePayload> => {
    const client = jose.createRemoteJWKSet(
        new URL('https://login.eveonline.com/oauth/jwks')
    )

    const { payload, protectedHeader } = await jose
        .jwtVerify(access_token, client, {
            audience: 'EVE Online',
            issuer: ['https://login.eveonline.com', 'login.eveonline.com'],
            ignoreExpiration: true,
        })
        .catch((error) => {
            throw error
        })

    return payload as EvePayload
}
