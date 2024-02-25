import { Metadata } from 'next'
import {
    Card,
    CardBody,
    Flex,
    Text,
    Image,
    Stack,
    IconButton,
    HStack,
    Divider,
} from '@chakra-ui/react'
import React from 'react'
import Header from '@/components/Header'
import { FaCloudDownloadAlt, FaRegTrashAlt } from 'react-icons/fa'

export const metadata: Metadata = {
    title: 'My Characters',
}

const playerId = 1249254900

const Page = () => (
    <>
        <Header title="Characters" />
        <Flex minWidth="100%" alignItems="center" gap="5" flexWrap="wrap">
            <Card maxW="sm">
                <CardBody>
                    <Image
                        src={`https://images.evetech.net/characters/${playerId}/portrait?size=128`}
                        borderRadius="lg"
                        alt="Eve character"
                    />
                    <Divider mt={'1em'} />
                    <HStack
                        spacing={3}
                        mt={'1em'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        textAlign={'center'}
                    >
                        <IconButton
                            icon={<FaRegTrashAlt />}
                            aria-label={'Delete Character'}
                            title={'Delete Character'}
                        />
                        <IconButton
                            icon={<FaCloudDownloadAlt />}
                            aria-label={'Update Character'}
                            title={'Update Character'}
                        />
                    </HStack>
                </CardBody>
            </Card>
        </Flex>
    </>
)

export default Page
