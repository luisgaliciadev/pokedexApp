import { useState, useEffect } from 'react';

export const useDevouncedValue = ( input: string = '', time: number = 500) => {
   
    const [devauncedValue, setDevauncedValue] = useState(input);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDevauncedValue(input);
        }, time);
        return () => {
            clearTimeout(timeout);
        }
    }, [input])

    return {
        devauncedValue
    }

}
