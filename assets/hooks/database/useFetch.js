import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
// import { AppContext } from "../../App";
import useTimeout from "../utility/useTimeout";

export const useRequestData = () => {
    const [requestData, setRequestData] = useState({});
    const [keyword, setKeyword] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const updateRequestData = useCallback(() => {
        console.log(keyword);
        let categories = document.querySelectorAll('.categ');
        let dataObj = {};
        if (keyword) {
            categories.forEach(cat => {
                if (cat.checked)
                    dataObj[cat.value] = keyword;
            });
        }
        setRequestData(dataObj);
    }, [keyword])

    useEffect(()=>{
        if(isUpdating){
            updateRequestData();
            setIsUpdating(false);
        }
    },[isUpdating, updateRequestData])

    useEffect(() => {
        updateRequestData();
    }, [updateRequestData])

    return [setKeyword, requestData, setIsUpdating]
}

const useFetch = (url) => {
    // const context = useContext(AppContext);
    const [createTimer, clearTimer] = useTimeout();

    const [state, setState] = useState({
        loading: true,
        data: [],
        fetchError: ''
    })
    const [setKeyword, requestData, setIsUpdating] = useRequestData();

    // const [headers] = useState({
    //     "Content-Type": 'application/json',
    //     "Authorization": 'Bearer ' + context.userState.userData.token
    // });

    useEffect(() => {
        clearTimer();
        createTimer(async () => {
            setState(s => ({ ...s, loading: true }));
            console.log(requestData);
            try {
                const result = await axios.post(url, requestData);
                console.log(result.data);
                setState(s => ({
                    data: result.data,
                    loading: false,
                    fetchError: ''
                }));
            } catch (error) {
                console.log(error.response.data.message);
                setState(s => ({
                    ...s,
                    loading: false,
                    fetchError: error.response.data.message
                }));
            }
        }, 500);
        return () => clearTimer();
    }, [requestData , url])

    return [state.loading, state.data, state.fetchError, setKeyword, setIsUpdating];
}

export default useFetch

export const useFetchApi = (url) => {
    // const appContext = useContext(AppContext);
    // const { userData } = appContext.userState;

    const [state, setState] = useState({
        loading: true,
        data: [],
        fetchError: ''
    })

    const fetchApi = async (reqData) => {
        console.log(reqData);
        setState(s => ({ ...s, loading: true }));
        try {
            const result = await axios.post(url, reqData);
            if (result.status === 200) {
                console.log(result.data);
                setState(s => ({
                    data: result.data,
                    loading: false,
                    fetchError: ''
                }));
            }
        } catch (error) {
            console.log(error.response.data.message);
            setState(s => ({
                ...s,
                loading: false,
                fetchError: error.response.data.message
            }));
        }
    }

    return [state.data, state.fetchError, fetchApi, state.loading]
}