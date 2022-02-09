import { useState } from "react";

const useTimeout = ()=>{
    const [timer, setTimer] = useState(undefined);

    const createTimer = (callback, delay) => {
        setTimer(setTimeout(callback, delay));
    }

    const clearTimer = () => {
        clearTimeout(timer);
        setTimer(undefined)
    }

    return [createTimer, clearTimer];
}

export default useTimeout;