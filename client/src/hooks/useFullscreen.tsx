import { useContext } from 'react'
import { FullscreenContext } from '../context/Fullscreen'

export const useFullscreen = () => useContext(FullscreenContext)
