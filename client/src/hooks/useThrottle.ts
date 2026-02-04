import { useRef } from "react";

export default function useThrottle(delay: number) {
    const lastTime = useRef(0);

    return () => {
        const now = Date.now();
        if (now - lastTime.current < delay) return false;
        lastTime.current = now;
        return true;
    };
}
