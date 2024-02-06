import { List } from '@chakra-ui/react'
import NavItem from './NavItem'
import { FaChartSimple, FaUsers, FaClover } from 'react-icons/fa6'
import navItem from './NavItem'

export type NavListItem = {
    text?: string
    icon: React.ElementType
    anchor?: string
}

const listItems: NavListItem[] = [
    {
        text: 'Dashboard',
        icon: FaChartSimple,
        anchor: '/dashboard',
    },
    {
        text: 'Characters',
        icon: FaUsers,
        anchor: '/dashboard/characters',
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
