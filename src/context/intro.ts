import { createContext, useContext } from 'react'

/**
 * True while the cinematic intro is on screen.
 * Sections use it to delay their entrance animation so the reveal is
 * seen after the curtain lifts instead of behind it.
 */
export const IntroContext = createContext(false)

export const useIntro = () => useContext(IntroContext)
