import React, { useEffect, useState } from 'react'
import { positionsCollection } from "../../firebase"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material"

export default function Tables() {
    const [positions, setPositions] = useState(null)

    useEffect(() => {
        if (!positions) {
            positionsCollection.get()
                .then(snapshot => {
                    const positions = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setPositions(positions)
                })
        }
    }, [positions])

    // console.log(positions);

    const showTeamPositions = () => {
        if (positions) {
            return (
                positions.map((position, index) => (
                    <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{position.team}</TableCell>
                        <TableCell>{position.w}</TableCell>
                        <TableCell>{position.d}</TableCell>
                        <TableCell>{position.l}</TableCell>
                        <TableCell>{position.pts}</TableCell>
                    </TableRow>
                ))
            )
        } else {
            return null;
        }
    }

    return (
        <div className='league_table_wrapper'>
            <div className='title'>
                League Table
            </div>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Pos</TableCell>
                            <TableCell>Team</TableCell>
                            <TableCell>W</TableCell>
                            <TableCell>L</TableCell>
                            <TableCell>D</TableCell>
                            <TableCell>Pts</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {showTeamPositions()}
                    </TableBody>

                </Table>
            </div>
        </div>
    )
}
