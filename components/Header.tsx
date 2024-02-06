import {
    Avatar,
    Box,
    Flex,
    Heading,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
} from '@chakra-ui/react'
import React from 'react'

type Props = {
    title: string
    playerId: string
}

const Header = ({ title, playerId }: Props) => (
    <Flex width="full" marginBottom="1em" alignItems="center">
        <Heading size="lg">{title}</Heading>
        <Spacer />
        <Menu>
            <MenuButton
                as={Avatar}
                aria-label="Profile"
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

export default Header
