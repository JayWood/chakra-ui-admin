'use client'
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function ThemeToggle() {
    const { toggleColorMode } = useColorMode()
    return (
        <IconButton
            alignSelf={'center'}
            size={'md'}
            backgroundColor={useColorModeValue('white', 'gray.700')}
            border={'1px'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            variant={'ghost'}
            aria-label={'Toggle Color Mode'}
            onClick={toggleColorMode}
            icon={useColorModeValue(<FaMoon />, <FaSun />)}
        />
    )
}
