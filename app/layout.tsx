'use server'
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import { Providers } from './providers'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}

export default RootLayout
