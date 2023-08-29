import React from 'react'
import { Tag } from '../../Utils/Tools'
import Blocks from "./Blocks"

export default function Matches() {
    return (
        <div className='home_matches_wrapper'>
            <div className='container'>
                <Tag
                    bck="#0e1731"
                    size="50px"
                    color="#ffffff"
                >
                    Matches
                </Tag>
                <Blocks />
                <Tag
                    size="22px"
                    color="#0e1731"
                    link={true}
                    linkTo="/the_team"
                >
                    Matches
                </Tag>

            </div>
        </div>
    )
}
