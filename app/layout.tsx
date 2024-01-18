'use server'
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <ChakraProvider>{children}</ChakraProvider>
            </body>
        </html>
    )
}

export default RootLayout
