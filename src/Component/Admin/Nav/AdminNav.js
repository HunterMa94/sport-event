import React from 'react'
import { Link } from "react-router-dom"
import { ListItem } from '@mui/material'

export default function AdminNav(props) {
    const config = [
        {
            title: "Maches",
            linkTo: '/admin_matches'
        }, {
            title: "Players",
            linkTo: "/admin_players"
        }]


    return (
        <div>
            {
                config.map((item) => {
                    return <Link
                        to={item.linkTo}
                        key={item.title}>
                        <ListItem className='admin_nav_link'>
                            {item.title}
                        </ListItem>
                    </Link>
                })
            }

        </div>

    )
}
