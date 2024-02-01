import {
    HStack,
    Link,
    ListIcon,
    ListItem,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react'
import { NavListItem } from '@/components/Nav'

const NavItem = ({ item }: { item: NavListItem }) => {
    const { text, icon, anchor }: NavListItem = item
    return (
        <ListItem
            as={HStack}
            spacing={0}
            h="10"
            pl="2.5"
            cursor="pointer"
            _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
            rounded="md"
            color={useColorModeValue('aside.icons.light', 'aside.icons.dark')}
        >
            {anchor ? (
                <Link href={anchor}>
                    <HStack>
                        <ListIcon boxSize={5} as={icon} />
                        {text && (
                            <Text
                                color={useColorModeValue(
                                    'aside.text.light',
                                    'aside.text.dark'
                                )}
                            >
                                {text}
                            </Text>
                        )}
                    </HStack>
                </Link>
            ) : (
                <HStack>
                    <ListIcon boxSize={5} as={icon} />
                    {text && (
                        <Text
                            color={useColorModeValue(
                                'aside.text.light',
                                'aside.text.dark'
                            )}
                        >
                            {text}
                        </Text>
                    )}
                </HStack>
            )}
        </ListItem>
    )
}

export default NavItem
