import { createContext, useEffect, useState, ReactNode } from 'react'

const defaultProvider: {
  fullscreen: boolean,
  setFullscreen: (value: boolean) => void
} = {
  fullscreen: false,
  setFullscreen: () => Boolean
}

const FullscreenContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const FullscreenProvider = ({ children }: Props) => {
  const [fullscreen, setFullscreen] = useState<boolean>(defaultProvider.fullscreen)

  useEffect(() => {
  }, [])

  const values = {
    fullscreen,
    setFullscreen
  }

  return <FullscreenContext.Provider value={values}>{children}</FullscreenContext.Provider>
}

export { FullscreenContext, FullscreenProvider }
