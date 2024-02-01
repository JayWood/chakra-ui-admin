// theme.ts
import { extendTheme, theme as baseTheme } from '@chakra-ui/react'

const theme = extendTheme({
    colors: {
        background: {
            light: baseTheme.colors.blue['50'],
            dark: baseTheme.colors.gray['800'],
        },
        primaryText: {
            light: baseTheme.colors.gray['800'],
            dark: baseTheme.colors.whiteAlpha['900'],
        },
        secondaryText: {
            light: baseTheme.colors.gray['600'],
            dark: baseTheme.colors.whiteAlpha['600'],
        },
        accent: {
            light: baseTheme.colors.teal['300'],
            dark: baseTheme.colors.orange['400'],
        },
        cards: {
            light: baseTheme.colors.white,
            dark: baseTheme.colors.gray['700'],
        },
        icon: {
            light: baseTheme.colors.teal['300'], // Accent color for icon background in light mode
            dark: baseTheme.colors.orange['400'], // Accent color for icon background in dark mode
        },
        iconColor: {
            light: baseTheme.colors.gray['800'], // Icon color in light mode
            dark: baseTheme.colors.whiteAlpha['900'], // Icon color in dark mode
        },
        borders: {
            light: baseTheme.colors.gray['300'],
            dark: baseTheme.colors.gray['600'],
        },
        button: {
            light: baseTheme.colors.blue['400'],
            dark: baseTheme.colors.blue['600'],
        },
        buttonText: {
            light: baseTheme.colors.white,
            dark: baseTheme.colors.white,
        },
        aside: {
            bg: {
                light: baseTheme.colors.blue['100'],
                dark: baseTheme.colors.gray['700'],
            },
            text: {
                light: baseTheme.colors.gray['600'],
                dark: baseTheme.colors.whiteAlpha['900'],
            },
            border: {
                light: baseTheme.colors.gray['300'],
                dark: baseTheme.colors.gray['600'],
            },
            icon: {
                light: baseTheme.colors.gray['600'],
                dark: baseTheme.colors.whiteAlpha['600'],
            },
        },
        anchor: {
            normal: {
                light: baseTheme.colors.blue['500'],
                dark: baseTheme.colors.blue['200'],
            },
            hover: {
                light: baseTheme.colors.blue['600'],
                dark: baseTheme.colors.blue['300'],
            },
        },
        iconHover: {
            light: baseTheme.colors.gray['600'],
            dark: baseTheme.colors.whiteAlpha['800'],
        },
    },
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
})

export default theme
