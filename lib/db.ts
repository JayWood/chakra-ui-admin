import {
    COLLECTION_USERS,
    EvePayload,
    refreshToken,
    UserRecord,
} from '@/lib/eve-auth'
import { createDocument, readDocument, updateDocument } from './mongodb'
import { WithId } from 'mongodb'

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
