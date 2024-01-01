'use client'

import { List, ListIcon, ListItem } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'

const Nav = () => (
    <List spacing={3}>
        <ListItem>
            <ListIcon as={PlusSquareIcon} color="green.500" />
            <p>This is a test</p>
        </ListItem>
    </List>
)
export default Nav
