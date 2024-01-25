
import {
    useLocation
} from "react-router-dom";
import { useEffect, useMemo } from "react";
import axios from "axios";
const LinkedInAuth = () => {
    function useQuery() {
        const { search } = useLocation();
        return new URLSearchParams(search);
    }
    const query = useQuery()

    useEffect(() => {
        // axios.get(process.env.REACT_APP_BACKEND_URL + '/auth/linkedin/callback', {
        //     params: {
        //         code: query.get('code'),
        //         state: query.get('state')
        //     }
        // }).then((res) => {})

    }, [])


    return <p>redirecting.......</p>
}

export default LinkedInAuth