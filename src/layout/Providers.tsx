'use client'

import React from "react"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { theme } from "./theme"

const Providers = ({children}: {children: React.ReactNode}) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <main className="p-4 h-full w-full">
                {children}
            </main>
        </ThemeProvider>
    )
}

export default Providers