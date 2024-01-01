import React from 'react'
import { Providers } from './providers'
import { Grid, GridItem } from '@chakra-ui/react'
import Nav from '../components/Nav'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Grid
                        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
                        gridTemplateRows={'50px 1fr 30px'}
                        gridTemplateColumns={'150px 1fr'}
                        minHeight={'500px'}
                        h="100vh"
                        color="blackAlpha.700"
                        fontWeight="bold"
                    >
                        <GridItem pl="2" bg="orange.300" area={'header'}>
                            Header
                        </GridItem>
                        <GridItem pl="2" bg="pink.300" area={'nav'}>
                            <Nav />
                        </GridItem>
                        <GridItem pl="2" bg="green.300" area={'main'}>
                            {children}
                        </GridItem>
                        <GridItem pl="2" bg="blue.300" area={'footer'}>
                            Footer
                        </GridItem>
                    </Grid>
                </Providers>
            </body>
        </html>
    )
}

export default RootLayout
