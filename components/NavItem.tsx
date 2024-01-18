import {
    HStack,
    ListIcon,
    ListItem,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'

interface NavItemProps {
    icon: any
    text: string
    link?: string
}

const NavItem = ({ icon, text, link }: NavItemProps) => (
    <ListItem
        as={HStack}
        spacing={0}
        h="10"
        pl="2.5"
        cursor="pointer"
        _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
        rounded="md"
    >
        <ListIcon boxSize={5} as={icon} />
        {text && <Text>{text}</Text>}
    </ListItem>
)

export default NavItem
