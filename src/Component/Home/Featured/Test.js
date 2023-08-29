import React from 'react';
import { motion } from 'framer-motion';

let stripesState = [
    {
        id: "001",
        background: "#98c5e9",
        left: 120,
        rotate: 25,
        top: -260,
        delay: 0
    },
    {
        id: "002",
        background: "#ffffff",
        left: 360,
        rotate: 25,
        top: -394,
        delay: 200
    },
    {
        id: "003",
        background: "#98c5e9",
        left: 600,
        rotate: 25,
        top: -498,
        delay: 400
    }
];

export default function Strips() {
    return (
        <div className='featured_stripes'>
            {stripesState.map((stripe) => (
                <motion.div
                    key={stripe.id}
                    initial={{
                        background: "#ffffff",
                        opacity: 0,
                        left: 0,
                        rotate: 0,
                        top: 0
                    }}
                    animate={{
                        background: stripe.background,
                        opacity: 1,
                        left: stripe.left,
                        rotate: stripe.rotate,
                        top: stripe.top,
                    }}
                    transition={{
                        delay: stripe.delay / 1000, // 转换为秒
                        duration: 0.2,
                        ease: [0.42, 0, 0.58, 1] // 使用 cubic-bezier 曲线，可以自行调整
                    }}
                    className='stripe'
                    style={{
                        background: stripe.background,
                        transform: `rotate(${stripe.rotate}deg) translate(${stripe.left}px, ${stripe.top}px)`
                    }}
                ></motion.div>
            ))}
        </div>
    );
}
