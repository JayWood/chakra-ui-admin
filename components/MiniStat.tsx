'use client'

import {
    Card,
    CardBody,
    Flex,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    useColorModeValue,
} from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { IconType } from 'react-icons'

interface StatProps {
    icon: ReactElement<IconType>
    title: string
    stat: string
    help: string
}

export default function MiniStat({ icon, stat, help, title }: StatProps) {
    return (
        <Card
            minHeight="83px"
            flexGrow="1"
            flexShrink="1"
            flexBasis="20%"
            minWidth="256px"
        >
            <CardBody>
                <Flex
                    flexDirection="row"
                    align="center"
                    justify="center"
                    w="100%"
                >
                    <Stat marginEnd="auto">
                        <StatLabel
                            fontSize="small"
                            color="gray.400"
                            fontWeight="bold"
                            paddingBottom=".1rem"
                        >
                            {title}
                        </StatLabel>
                        <Flex>
                            <StatNumber
                                fontSize="large"
                                color={useColorModeValue(
                                    'primaryText.light',
                                    'primaryText.dark'
                                )}
                            >
                                {stat}
                            </StatNumber>
                            <StatHelpText
                                alignSelf="flex-end"
                                justifySelf="flex-end"
                                margin="0px"
                                fontWeight="bold"
                                paddingStart="3px"
                                fontSize={'md'}
                                color={useColorModeValue(
                                    'secondaryText.light',
                                    'secondaryText.dark'
                                )}
                            >
                                {help}
                            </StatHelpText>
                        </Flex>
                    </Stat>
                    <Flex
                        alignItems={'center'}
                        justifyContent={'center'}
                        borderRadius={'12px'}
                        w={'45px'}
                        h={'45px'}
                        bg={'gray.400'}
                        ml={'1em'}
                        bgColor={useColorModeValue('icon.light', 'icon.dark')}
                        color={useColorModeValue(
                            'iconColor.light',
                            'iconColor.dark'
                        )}
                    >
                        {icon}
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    )
}
