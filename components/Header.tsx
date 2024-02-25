'use server'

import {
    Avatar,
    Flex,
    Heading,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
} from '@chakra-ui/react'
import React from 'react'
import { cookies } from 'next/headers'

const Header = ({ title }: { title: string }) => {
    const playerData = decodeURIComponent(
        cookies().get('character').value
    ).split('|')

    const playerId = playerData[1]
    const playerName = playerData[0]

    console.log({ playerId })

    return (
        <Flex width="full" marginBottom="1em" alignItems="center">
            <Heading size="lg">{title}</Heading>
            <Spacer />
            <Menu>
                <MenuButton
                    as={Avatar}
                    aria-label={`My Profile: ${playerName}`}
                    src={`https://images.evetech.net/characters/${playerId}/portrait?size=128`}
                    cursor="pointer"
                />
                <MenuList>
                    <MenuItem as="a" href="/dashboard/settings">
                        Settings
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    )
}

export default Header
