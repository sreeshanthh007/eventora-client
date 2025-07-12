import { useState , useEffect, useCallback } from "react";


export const UseTimer = (initialTime:number) =>{
    const [timeLeft,setTimeLeft] = useState(initialTime)
    const [isRunning,setIsRunning] = useState(false);

    const startTimer = useCallback(()=>{
        setIsRunning(true)
    },[]);

    const resetTimer = useCallback(()=>{
        setIsRunning(false);
        setTimeLeft(initialTime)
    },[initialTime])


    useEffect(()=>{
        let interval = null
        if(isRunning && timeLeft > 0){
           interval  = setInterval(()=>{
                setTimeLeft(prev=>prev-1);
            },1000)
        }else if(timeLeft==0){
            setIsRunning(false)
        }

        return ()=>{
            if(interval) clearInterval(interval)
        }
    },[isRunning,timeLeft])

    return {timeLeft,startTimer,resetTimer}
}