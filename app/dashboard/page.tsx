import { Metadata } from 'next'
import {
    Box,
    Card,
    CardBody,
    Flex,
    Heading,
    HStack,
    SimpleGrid,
    Spacer,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    Text,
} from '@chakra-ui/react'
import React from 'react'
import { FaMoneyBillAlt } from 'react-icons/fa'
import MiniStat from '@/components/MiniStat'

export const metadata: Metadata = {
    title: 'Nextjs Testing',
    description: 'This is a test',
}

const Page = () => (
    <>
        <Flex width="full" marginBottom="1em">
            <Box>
                <Heading size="md">Dashboard</Heading>
            </Box>
            <Spacer />
            <Box>
                <Text>Avatar</Text>
            </Box>
        </Flex>
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
