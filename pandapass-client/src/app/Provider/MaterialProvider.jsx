"use client"
import { ThemeProvider } from "@material-tailwind/react";
import React from 'react'

const MaterialProvider = ({children}) => {
  return (
  <ThemeProvider>
    {children}
  </ThemeProvider>
  )
}

export default MaterialProvider