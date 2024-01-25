import { useContext } from 'react'
import { AuthContext } from '../context/Auth'

export const useAuth = () => useContext(AuthContext)
