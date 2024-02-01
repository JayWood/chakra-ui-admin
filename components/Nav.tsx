import { List } from '@chakra-ui/react'
import NavItem from './NavItem'
import { FaChartSimple, FaClipboardList, FaClover } from 'react-icons/fa6'
import navItem from './NavItem'

export type NavListItem = {
    text?: string
    icon: React.ElementType
    anchor?: string
}

const listItems: NavListItem[] = [
    {
        text: 'Home',
        icon: FaChartSimple,
        anchor: 'http://google.com/test',
    },
    {
        text: 'Settings',
        icon: FaClipboardList,
    },
    {
        text: 'Users',
        icon: FaClover,
    },
]

const Nav = ({ isOpen }) => (
    <List spacing={0} p="0.5">
        {listItems.map((item, index) => (
            <NavItem key={`mainNav-${index}`} item={item} />
        ))}
    </List>
)
export default Nav
