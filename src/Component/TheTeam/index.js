import React, { useEffect, useState } from 'react'
import PlayerCard from '../Utils/PlayerCard'
import { Slide } from 'react-awesome-reveal'
import { Promise } from 'core-js'

import { firebase, playersCollection } from "../../firebase"
import { showErrorToast } from '../Utils/Tools';
import { CircularProgress } from '@mui/material'


const TheTeam = () => {
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState(null)



    useEffect(() => {
        if (!players) {
            playersCollection
                .get()
                .then(snapshot => {
                    const players = snapshot.docs.map(doc => ({
                        id: doc.id, ...doc.data()
                    }))

                    let promises = [];

                    players.forEach((player, index) => {
                        // Temporarily set the image as...
                        player.image = "47cc05c6-47ef-4384-ac4a-e1b1dc68d5ab.png"
                        promises.push(
                            new Promise((resolve, reject) => {
                                firebase.storage().ref('players')
                                    .child(player.image).getDownloadURL()
                                    .then(url => {
                                        players[index].url = url;
                                        resolve()
                                    }).catch(error => {
                                        reject()
                                    })
                            })
                        )
                    });

                    Promise.all(promises)
                        .then(() => {
                            setPlayers(players);
                        })
                    //// 
                }).catch(error => {
                    showErrorToast('Sorry try again later')
                }).finally(() => {
                    setLoading(false)
                })
        }
    }, [players])


    // console.log(players)

    const showPlayerByCategory = (category) => (
        players ?
            players.map((player, index) => {
                return player.position === category ?
                    <Slide left key={player.id} triggerOnce>
                        <PlayerCard
                            number={player.number}
                            name={player.name}
                            lastname={player.lastname}
                            bck={player.url}
                        />
                    </Slide>
                    : null
            })
            : null
    )

    return (
        <div className='the_team_container'>
            {loading
                ? <div className='progress'>
                    <CircularProgress />
                </div>
                :
                <div>
                    <div className='team_category_wrapper'>
                        <div className='title'>Keepers</div>
                        <div className='team_cards'>
                            {showPlayerByCategory("Keeper")}
                        </div>
                    </div>

                    <div className='team_category_wrapper'>
                        <div className='title'>Defence</div>
                        <div className='team_cards'>
                            {showPlayerByCategory("Defence")}
                        </div>
                    </div>

                    <div className='team_category_wrapper'>
                        <div className='title'>Midfield</div>
                        <div className='team_cards'>
                            {showPlayerByCategory("Midfield")}
                        </div>
                    </div>

                    <div className='team_category_wrapper'>
                        <div className='title'>Striker</div>
                        <div className='team_cards'>
                            {showPlayerByCategory("Striker")}
                        </div>
                    </div>
                </div>

            }

        </div>
    )
}

export default TheTeam;