import { createContext, useEffect, useState, ReactNode, useMemo } from 'react'
import axios from 'axios'
import authConfig from '../configs/auth'
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType, SignUpParams } from './types'
import { useLocation, useNavigate } from 'react-router-dom'

const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  jobViewContext: null,
  setJobViewContext: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  signup: () => Promise.resolve(),
  addQuestion: () => Promise.resolve(),
  initAuth: () => null,
  isLoggedIn: () => false
}

const AuthContext = createContext(defaultProvider)
type Props = {
  children: ReactNode,
  setMainScreen: any
}
function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
const AuthProvider = ({ children, setMainScreen }: Props) => {
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [jobView, setJobView] = useState<any>(defaultProvider.jobViewContext)
  const query = useQuery()
  const navigate = useNavigate()

  const PaymentSuccess = (sessionId: any, userId: any) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/stripe/${sessionId}`, { userId: userId }).then((res) => {
      navigate('/')

    }).catch((err) => err)


  }

  const initAuth = async (): Promise<void> => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
    const shared = window.localStorage.getItem('shared')
    console.log("shared localstrg", shared)

    if (storedToken) {
      setLoading(true)
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}${authConfig.meEndpoint}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        })
        .then(async response => {
          setLoading(false)
          setUser(response.data)
          const sessionId = query.get('session_id')
          if (sessionId) {
            const { id } = response.data
            PaymentSuccess(sessionId, id)
          }
          if (response?.data?.token) {
            window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.token);
          }
          if (!!shared) {
            console.log("share if", shared)
            setMainScreen(8)
          }
          else {

            setMainScreen(1);
          }
        })
        .catch(() => {
          localStorage.removeItem(authConfig.storageTokenKeyName)
          setUser(null)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    initAuth()
  }, [])

  const isLoggedIn = () => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
    if (storedToken) {
      return true;
    }
    return false;
  };

  const handleRegister = (params: SignUpParams, errorCallback?: ErrCallbackType) => {
    return new Promise((resolve, rejects) => {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}${authConfig.registerEndpoint}`, params)
        .then(async response => {
          resolve(response)
        })
        .catch(err => {
          rejects(err)
          if (errorCallback) errorCallback(err)
        })
    });
  }

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    return new Promise((resolve, rejects) => {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}${authConfig.loginEndpoint}`, params)
        .then(async response => {
          resolve(response)
          setUser(response.data)

          if (response?.data?.token) {
            window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.token);
          }
        })
        .catch(err => {
          rejects(err)
          if (errorCallback) errorCallback(err)
        })
    })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
  }

  const createQuestion = (params: any, errorCallback?: ErrCallbackType) => {
    return new Promise((resolve, rejects) => {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}${authConfig.addQuestion}`, params)
        .then(async response => {
          resolve(response)
        })
        .catch(err => {
          rejects(err)
          if (errorCallback) errorCallback(err)
        })
    })
  }

  const values = {
    user,
    loading,
    setUser,
    jobViewContext: jobView,
    setJobViewContext: setJobView,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    signup: handleRegister,
    addQuestion: createQuestion,
    initAuth,
    isLoggedIn
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
