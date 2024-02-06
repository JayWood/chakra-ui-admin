import { Metadata } from 'next'
import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Text,
} from '@chakra-ui/react'
import MiniStat from '@/components/MiniStat'
import { FaMoneyBillAlt } from 'react-icons/fa'
import React from 'react'
import Header from '@/components/Header'

export const metadata: Metadata = {
    title: 'My Characters',
}

const Page = () => (
    <>
        <Header title="Characters" playerId="1249254900" />
        <Flex minWidth="100%" alignItems="center" gap="5" flexWrap="wrap">
            <MiniStat
                icon={<FaMoneyBillAlt />}
                title={'Some Stat'}
                stat={'37,000,000,000'}
                help={'Isk'}
            />
            <MiniStat
                icon={<FaMoneyBillAlt />}
                title={'Some Stat'}
                stat={'37,000,000,000'}
                help={'Isk'}
            />
            <MiniStat
                icon={<FaMoneyBillAlt />}
                title={'Some Stat'}
                stat={'37,000,000,000'}
                help={'Isk'}
            />
            <MiniStat
                icon={<FaMoneyBillAlt />}
                title={'Some Stat'}
                stat={'37,000,000,000'}
                help={'Isk'}
            />
        </Flex>
    </>
)

export default Page
