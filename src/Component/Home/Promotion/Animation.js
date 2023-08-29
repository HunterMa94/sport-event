import React from 'react'
import { Zoom } from "react-awesome-reveal"

export default function Animation() {
    return (
        <div className='promotion_animation'>
            <div className='left'>
                <Zoom>
                    <div>
                        <span>Win a </span>
                        <span>Jursey</span>
                    </div>
                </Zoom>
            </div>
            <div className='right'>
                <Zoom>
                    <div className='jersey'>
                    </div>
                </Zoom>
            </div>
        </div>
    )
}
