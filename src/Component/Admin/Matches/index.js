import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout'

import { matchesCollection } from "../../../firebase"
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


export default function AdminMatches() {
    const [lastVisable, setLastVisable] = useState(null);
    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState(null);

    useEffect(() => {
        if (!matches) {
            setLoading(true);
            matchesCollection
                .limit(2)
                .get()
                .then(snapshot => {
                    const lastVisable = snapshot.docs[snapshot.docs.length - 1];
                    const matches = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setLastVisable(lastVisable);
                    setMatches(matches)
                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    setLoading(false)
                })
        }
    }, [matches]);

    const loadMoreMatches = () => {
        if (lastVisable) {
            setLoading(true);
            matchesCollection
                .startAfter(lastVisable)
                .limit(2)
                .get()
                .then(snapshot => {
                    const lastVisable = snapshot.docs[snapshot.docs.length - 1];
                    const newMatches = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setLastVisable(lastVisable);
                    setMatches([...matches, ...newMatches]);
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
            <AdminLayout title="The matches">
                <div className="mb-5">
                    <Link to={'/admin_matches/add_match'}>
                        <Button
                            disableElevation
                            variant="outlined"
                            color="inherit"
                        >
                            Add matches
                        </Button>
                    </Link>
                </div>
                <Paper className='mb-5'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Match</TableCell>
                                <TableCell>Result</TableCell>
                                <TableCell>Final</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {matches ?
                                matches.map((match) => (
                                    <TableRow key={match.id}>
                                        <TableCell>
                                            {match.date}
                                        </TableCell>
                                        <TableCell>
                                            <Link to={`/admin_matches/edit_match/${match.id}`}>
                                                {match.away} <strong>-</strong> {match.local}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {match.resultAway} <strong>-</strong> {match.resultLocal}
                                        </TableCell>
                                        <TableCell>
                                            {match.final === "yes"
                                                ?
                                                <span className='matches_tag_red'>Final</span>
                                                :
                                                <span className='matches_tag_green'>Not played yet</span>}
                                        </TableCell>
                                    </TableRow>
                                ))
                                : null}
                        </TableBody>
                    </Table>
                </Paper>

                <Button
                    variant='contained'
                    onClick={() => loadMoreMatches()}
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
