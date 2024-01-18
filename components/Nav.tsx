import { List } from '@chakra-ui/react'
import NavItem from './NavItem'
import { FaChartSimple, FaClipboardList, FaClover } from 'react-icons/fa6'

type ListItem = {
    text?: string
    icon: React.ElementType
}

const listItems: ListItem[] = [
    {
        text: 'Home',
        icon: FaChartSimple,
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
            <NavItem
                icon={item.icon}
                text={isOpen ? item.text : ''}
                key={index}
            />
        ))}
    </List>
)
export default Nav
