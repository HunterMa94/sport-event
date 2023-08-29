import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout'

import { playersCollection } from "../../../firebase"
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    CircularProgress
} from '@mui/material';
import { showErrorToast } from "../../Utils/Tools"


export default function AdminPlayers() {
    const [lastVisable, setLastVisable] = useState(null);
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState(null);

    useEffect(() => {
        if (!players) {
            setLoading(true);
            playersCollection
                .limit(2)
                .get()
                .then(snapshot => {
                    const lastVisable = snapshot.docs[snapshot.docs.length - 1];
                    const players = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setLastVisable(lastVisable);
                    setPlayers(players)
                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    setLoading(false)
                })
        }
    }, [players]);

    const loadMorePlayers = () => {
        if (lastVisable) {
            setLoading(true);
            playersCollection
                .startAfter(lastVisable)
                .limit(2)
                .get()
                .then(snapshot => {
                    const lastVisable = snapshot.docs[snapshot.docs.length - 1];
                    const newPlayers = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setLastVisable(lastVisable);
                    setPlayers([...players, ...newPlayers]);
                }).catch(error => {
                    showErrorToast(error);
                }).finally(() => {
                    setLoading(false)
                })
        } else {
            showErrorToast("Nothing to load");
        }
    }

    // console.log(players);
    // console.log(lastVisable);
    return (
        <div>
            <AdminLayout title="The players">
                <div className="mb-5">
                    <Link to={'/admin_players/add_player'}>
                        <Button
                            disableElevation
                            variant="outlined"
                            color="inherit"
                        >
                            Add players
                        </Button>
                    </Link>
                </div>
                <Paper className='mb-5'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>First name</TableCell>
                                <TableCell>Last name</TableCell>
                                <TableCell>Number</TableCell>
                                <TableCell>Position</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {players ?
                                players.map((player) => (
                                    <TableRow key={player.id}>
                                        <TableCell>
                                            <Link to={`/admin_players/edit_player/${player.id}`}>
                                                {player.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link to={`/admin_players/edit_player/${player.id}`}>
                                                {player.lastname}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link >
                                                {player.number}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link >
                                                {player.position}
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                                : null}
                        </TableBody>
                    </Table>
                </Paper>

                <Button
                    variant='contained'
                    onClick={() => loadMorePlayers()}
                    color="primary"
                    disabled={loading}

                >
                    Load more
                </Button>
                <div className='admin_progress'>
                    {loading
                        ? <CircularProgress thickness={7} style={{ color: "#98c5e9" }} />
                        : null}
                </div>
            </AdminLayout>
        </div>
    )
}
