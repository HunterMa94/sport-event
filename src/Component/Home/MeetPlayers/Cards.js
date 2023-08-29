import React from 'react'
import { motion } from 'framer-motion'
import { easePolyOut } from 'd3-ease'

import Otamendi from '../../../Resources/images/players/Otamendi.png'
import Sterling from '../../../Resources/images/players/Raheem_Sterling.png'
import Kompany from '../../../Resources/images/players/Vincent_Kompany.png'

import PlayerCard from '../../Utils/PlayerCard'

let cards = [
    {
        bottom: 90,
        left: 300,
        player: Kompany
    },
    {
        bottom: 60,
        left: 200,
        player: Sterling
    },
    {
        bottom: 30,
        left: 100,
        player: Otamendi
    }
]

export default function Cards(props) {
    const showAnimateCards = () => (
        cards.map((card, index) => (
            <motion.div
                key={index}
                initial={{
                    left: 0,
                    bottom: 0
                }}
                animate={props.show ? {
                    left: card.left,
                    bottom: card.bottom,
                    transition: {
                        delay: 0.8,
                        duration: 0.8,
                        ease: easePolyOut
                    }
                } : {}}
                style={{
                    position: 'absolute',
                    left: card.left,
                    bottom: card.bottom
                }}
            >
                <PlayerCard
                    number="30"
                    name="Nicolas"
                    lastName="Otamendi"
                    bck={card.player}
                />
            </motion.div>
        ))
    )

    return (
        <div>
            {showAnimateCards()}
        </div>
    )
}
