import { Metadata } from 'next'
import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export const metadata: Metadata = {
    title: 'Nextjs Testing',
    description: 'This is a test',
}

const Page = () => (
    <Box textAlign="center">
        <Heading as="h3">Main Heading</Heading>
        <Text>Empty Main Content</Text>
    </Box>
)
export default Page
