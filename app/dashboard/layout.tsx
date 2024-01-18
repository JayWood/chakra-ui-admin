'use client'
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Text,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react'
import Nav from '../../components/Nav'
import { FaBars, FaChevronLeft } from 'react-icons/fa6'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { getButtonProps, isOpen } = useDisclosure()
    const buttonProps = getButtonProps()
    return (
        <HStack minH="100vh" align="start" spacing={0}>
            <Box
                as="aside"
                minH="100vh"
                w={isOpen ? 72 : 12}
                borderRight="2px"
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                transition="width 0.25s ease"
            >
                <HStack h="14" justify="space-between">
                    {isOpen && <Text p="2.5">Stuffs</Text>}
                    <IconButton
                        {...buttonProps}
                        _active="none"
                        _focus="none"
                        _hover="none"
                        fontSize="18px"
                        variant="ghost"
                        icon={!isOpen ? <FaBars /> : <FaChevronLeft />}
                        aria-label="open menu"
                    />
                </HStack>
                <Nav isOpen={isOpen} />
            </Box>
            <Flex
                as="main"
                w="full"
                minH="100vh"
                align="center"
                justify="center"
                bg={useColorModeValue('gray.50', 'gray.900')}
            >
                {children}
            </Flex>
        </HStack>
    )
}
export default DashboardLayout
