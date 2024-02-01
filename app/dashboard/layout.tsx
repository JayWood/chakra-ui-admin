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
                bg={useColorModeValue(
                    'aside.background.light',
                    'aside.background.dark'
                )}
                borderColor={useColorModeValue('borders.light', 'borders.dark')}
                transition="width 0.25s ease"
                color={useColorModeValue('aside.text.light', 'aside.text.dark')}
            >
                <HStack h="14" justify="space-between">
                    {isOpen && <Text p="2.5">Dashboard</Text>}
                    <IconButton
                        {...buttonProps}
                        _active="none"
                        _focus="none"
                        _hover="none"
                        fontSize="18px"
                        variant="ghost"
                        icon={!isOpen ? <FaBars /> : <FaChevronLeft />}
                        aria-label="open menu"
                        color={useColorModeValue('icons.light', 'icons.dark')}
                    />
                </HStack>
                <Nav isOpen={isOpen} />
            </Box>
            <Flex
                as="main"
                w="full"
                minH="100vh"
                align="start"
                padding="1em"
                direction="column"
                bg={useColorModeValue('background.light', 'background.dark')}
            >
                {children}
            </Flex>
        </HStack>
    )
}
export default DashboardLayout
