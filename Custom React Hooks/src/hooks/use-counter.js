import { useState, useEffect } from "react";
const useCounter = (operator) => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (operator === "+") {
                setCounter((prevCounter) => prevCounter + 1);
            } else {
                setCounter((prevCounter) => prevCounter - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [operator]);

    return counter;
};

export default useCounter;
