import { Metadata } from 'next'
import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { FaMoneyBillAlt } from 'react-icons/fa'
import MiniStat from '@/components/MiniStat'
import Header from '@/components/Header'

export const metadata: Metadata = {
    title: 'Nextjs Testing',
    description: 'This is a test',
}

const Page = () => (
    <>
        <Header title="Dashboard" playerId="1249254900" />
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
