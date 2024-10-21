'use client'
import React, { useEffect, useMemo, useState } from 'react';

export const LogoAnimated = () => {
    const positionsArray = useMemo(() => {
        const pos1 = [0, 0, 1, 1, 0, 1, 0, 1, 1];
        const pos2 = [1, 0, 0, 0, 1, 1, 1, 1, 0];
        const pos3 = [0, 1, 0, 0, 0, 1, 1, 1, 1];
        const pos4 = [1, 0, 1, 0, 1, 1, 0, 1, 0];
        return [pos1, pos2, pos3, pos4];
    }, []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [positions, setPositions] = useState(positionsArray[currentIndex]);


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % positionsArray.length;
                setPositions(positionsArray[nextIndex]);
                return nextIndex;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [positionsArray]);

    return (
        <div className={`mx-auto grid grid-cols-3 w-[60px] h-[60px] my-4`}>
            {
                positions.map((position, i) => {
                    if (position === 0)
                        return <div key={i} />
                    return <Rect key={i} col={position} color={`fill-cyan-600`} />
                })
            }
        </div>
    );
};

export const LogoStatic = () => {
    const positions = [0, 0, 1, 1, 0, 1, 0, 1, 1];
    return (
        <div className={`grid grid-cols-3 w-[60px] h-[60px]`}>
            {
                positions.map((position, i) => {
                    if (position === 0)
                        return <div key={i} />
                    return <Rect key={i} col={position} color={`fill-white`} />
                })
            }
        </div>
    )
}

const Rect = ({ color }) => {
    return <svg className={`w-[20px] h-[20px]`} xmlns="http://www.w3.org/2000/svg">
        <rect width='20' height='20' className={color} />
    </svg>
}