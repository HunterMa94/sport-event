import React, { useEffect, useReducer, useState } from 'react'
import { showErrorToast } from "../Utils/Tools"

import { CircularProgress, SliderThumb } from '@mui/material'
import { matchesCollection } from "../../firebase"

import Tales from "./Tables"
import MatchesList from './MatchesList'


export default function Matches() {
    const [matches, setMatches] = useState(null);
    const [state, dispatch] = useReducer((preSate, nextState) => {
        return { ...preSate, ...nextState }
    }, {
        filterMatches: null,
        payedFilter: 'All',
        resultFilter: 'All'
    });

    useEffect(() => {
        if (!matches) {
            matchesCollection.get()
                .then(snapshot => {
                    const matches = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setMatches(matches)
                    dispatch({ ...state, filterMatches: matches })
                }).catch(error => {
                    showErrorToast(error);
                })
        }
    }, [matches, state])

    // console.log(matches);

    const showPlayed = (played) => {
        // all, yes, no
        const list = matches.filter((match) => {
            return match.final === played
        });

        dispatch({
            ...state,
            filterMatches: played === 'All' ? matches : list,
            playedFilter: played,
            resultFilter: 'All'
        });

    };

    const showResult = (result) => {
        const list = matches.filter((match) => {
            return match.result === result
        });

        dispatch({
            ...state,
            filterMatches: result === "All" ? matches : list,
            playedFilter: "All",
            resultFilter: result
        })
    }


    console.log(state.filterMatches);

    return (
        <div>
            {matches
                ?
                <div className='the_matches_container'>
                    <div className='the_matches_wrapper'>
                        <div className='left'>
                            <div className='match_filters'>
                                <div className='match_filters_box'>
                                    <div className='tag'>
                                        show matches
                                    </div>
                                    <div className='cont'>
                                        <div className={`option ${state.playedFilter === "All" ? "active" : ""}`}
                                            onClick={() => showPlayed("All")}
                                        >
                                            All
                                        </div>
                                        <div className={`option ${state.playedFilter === "yes" ? "active" : ""}`}
                                            onClick={() => showPlayed("yes")}
                                        >
                                            Played
                                        </div>
                                        <div className={`option ${state.playedFilter === "no" ? "active" : ""}`}
                                            onClick={() => showPlayed("no")}
                                        >
                                            Not Played
                                        </div>
                                    </div>
                                </div>
                                <div className='match_filters_box'>
                                    <div className='tag'>
                                        Game result
                                    </div>
                                    <div className='cont'>
                                        <div className={`option ${state.resultFilter === "All" ? "active" : ""}`}
                                            onClick={() => showResult("All")}
                                        >
                                            All
                                        </div>
                                        <div className={`option ${state.resultFilter === "W" ? "active" : ""}`}
                                            onClick={() => showResult("W")}
                                        >
                                            W
                                        </div>
                                        <div className={`option ${state.resultFilter === "L" ? "active" : ""}`}
                                            onClick={() => showResult("L")}
                                        >
                                            L
                                        </div>
                                        <div className={`option ${state.resultFilter === "D" ? "active" : ""}`}
                                            onClick={() => showResult("D")}
                                        >
                                            D
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <MatchesList matches={state.filterMatches} />
                        </div>
                        <div className='right'>
                            <Tales />
                        </div>
                    </div>
                </div>
                :
                <div className='progress'>
                    <CircularProgress />
                </div>}
        </div>
    )
}
