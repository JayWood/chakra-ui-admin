'use client'

import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react'
import ThemeToggle from '@/components/ThemeToggle'

const Login = ({ csrfToken }: { csrfToken: string }) => {
    return (
        <Flex
            minH="100vh"
            bg={useColorModeValue('white', 'gray.800')}
            as="main"
        >
            <Box
                w="65%"
                display={{ base: 'none', lg: 'block' }}
                bgSize="cover"
                bgPos="center"
                position="relative"
                style={{
                    backgroundImage: 'url(/eve/havoc-background.jpg)',
                }}
            >
                <Box
                    bg="gray.900"
                    opacity="0.5"
                    position="absolute"
                    top="0"
                    left="0"
                    w="100%"
                    h="100%"
                ></Box>
            </Box>
            <Box w={{ base: '100%', lg: '35%' }} minH="100vh" p="8">
                <VStack
                    align="center"
                    spacing="5"
                    justify="center"
                    h="100%"
                    alignItems="stretch"
                >
                    <Heading as="h1" fontSize="3xl" textAlign="center">
                        Sign in to Eve Market
                    </Heading>
                    <VStack spacing="4">
                        <form action="/api/auth/login" method="POST">
                            <input
                                type="hidden"
                                value={csrfToken}
                                name="csrf_token"
                            />
                            <Button type="submit">
                                <Image
                                    src={useColorModeValue(
                                        'eve/eve-sso-login-black-large.png',
                                        'eve/eve-sso-login-white-large.png'
                                    )}
                                    alt="Image of EveOnline"
                                />
                            </Button>
                            <ThemeToggle />
                        </form>
                    </VStack>
                    <Text mt="3" fontSize="xs" textAlign="center" as="em">
                        Alpha Testing Only
                    </Text>
                </VStack>
            </Box>
        </Flex>
    )
}

export default Login
