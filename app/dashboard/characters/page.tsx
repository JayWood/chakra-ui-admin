import { Metadata } from 'next'
import {
    Flex,
} from '@chakra-ui/react'
import React from 'react'
import Header from '@/components/Header'
import {CharacterCard} from "@/components/CharacterCard";

export const metadata: Metadata = {
    title: 'My Characters',
}

const playerId = 1249254900

const Page = () => (
    <>
        <Header title="Characters" />
        <Flex minWidth="100%" alignItems="center" gap="5" flexWrap="wrap">
            <CharacterCard playerId={playerId} name="Sprygor" />
        </Flex>
    </>
)

export default Page
