import React from 'react';
import { motion } from 'framer-motion';
import { easePolyOut } from 'd3-ease';

import FeaturedPlayer from '../../../Resources/images/featured_player.png';

const Text = () => {
    const animateNumber = () => (
        <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ duration: 1, ease: easePolyOut }}
            className="featured_number"
            style={{ transform: 'translate(260px, 170px) rotateY(0deg)' }}
        >
            5
        </motion.div>
    );

    const animateFirstText = () => (
        <motion.div
            initial={{ opacity: 0, x: 503, y: 450 }}
            animate={{ opacity: 1, x: 273, y: 450 }}
            transition={{ duration: 0.5, ease: easePolyOut }}
            className="featured_first"
            style={{ transform: 'translate(503px, 450px)' }}
        >
            League
        </motion.div>
    );

    const animateSecondText = () => (
        <motion.div
            initial={{ opacity: 0, x: 503, y: 586 }}
            animate={{ opacity: 1, x: 273, y: 586 }}
            transition={{ delay: 0.3, duration: 0.5, ease: easePolyOut }}
            className="featured_first"
            style={{ transform: 'translate(503px, 586px)' }}
        >
            Championships
        </motion.div>
    );

    const animatePlayer = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5, ease: easePolyOut }}
            className="featured_player"
            style={{
                background: `url(${FeaturedPlayer}) no-repeat`,
                transform: 'translate(550px, 201px)',
            }}
        ></motion.div>
    );

    return (
        <div className="featured_text">
            {animatePlayer()}
            {animateNumber()}
            {animateFirstText()}
            {animateSecondText()}
        </div>
    );
};

export default Text;
