import { useContext } from 'react'
import { SharedContext } from '../context/Share'

export const useShared = () => useContext(SharedContext)
