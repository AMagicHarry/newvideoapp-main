import axios from 'axios'
import { createContext, useEffect, useState, ReactNode } from 'react'
import { useParams } from 'react-router-dom'

const defaultProvider: {
    flag: boolean,
    setFlag: (value: boolean) => void
    shared: boolean,
    setShared: (value: boolean) => void
    sharedJobData: null,
    setSharedJobData: (value: any) => void
} = {
    flag: false,
    setFlag: () => Boolean,
    shared: false,
    setShared: () => Boolean,
    sharedJobData: null,
    setSharedJobData: () => { },
}

const SharedContext = createContext(defaultProvider)

type Props = {
    children: ReactNode
}




const SharedProvider = ({ children }: Props) => {
    const [shared, setShared] = useState<boolean>(defaultProvider.shared)
    const [sharedJobData, setSharedJobData] = useState<any>(defaultProvider.sharedJobData)
    const [flag, setFlag] = useState<boolean>(defaultProvider.flag)
    const params = useParams()

    useEffect(() => {
        const { job_id } = params
        // console.log("shared job id", job_id)
        if (job_id) {
            // axios.get(`${process.env.REACT_APP_BACKEND_URL}/interviewer/${job_id}`).then((res) => {
            //     setSharedJobData(res.data)
            //     setShared(true)
            //     console.log("shared job data", res.data)
            // })

            // console.log("shared job id", job_id)
        }
    }, [params])

    useEffect(() => {


        console.log('shared useeffect', sharedJobData)

    }, [sharedJobData])


    const values = {
        shared,
        setShared,
        sharedJobData,
        setSharedJobData,
        flag,
        setFlag
    }

    return <SharedContext.Provider value={values}>{children}</SharedContext.Provider>
}

export { SharedContext, SharedProvider }
