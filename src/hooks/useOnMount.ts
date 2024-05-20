import { useEffect, useRef } from 'react';

export const useOnMount = (onMount: () => void, onUnmount?: () => void) => {
    const p = useRef(Promise.resolve());

    useEffect(() => {
        p.current = p.current.then(onMount);
        return () => {
            if (onUnmount) {
                p.current = p.current.then(onUnmount);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
