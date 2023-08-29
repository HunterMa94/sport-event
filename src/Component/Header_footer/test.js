import React, { Component } from 'react'
import { AppBar, Toolbar, Button, } from '@mui/material';


import { Link, useNavigate } from "react-router-dom"
import { CityLogo } from "../Utils/Tools"
import { firebase } from "../../firebase"

export default class Header extends Component {
    state = { flag: false }
    logoutHandler = () => {
        firebase.auth().signOut()
            .then(() => {
                alert("signed out")
                // navigate("/");
            }).catch(error => {
                alert(error)
            })
    }

    componentDidMount() {
        setInterval(() => {
            const { flag } = this.state;
            const newflag = !flag
            this.setState({ flag: newflag })
        }, 1000)
    }

    render() {
        const { user } = this.props;
        const { flag } = this.state;
        return (
            <AppBar
                position='fixed'
                style={{
                    backgroundColor: "#98c5e9",
                    boxShadow: "none",
                    padding: "10px 0",
                    borderBottom: "2px solid #00285e"
                }}
            >
                <Toolbar style={{ display: "flex" }}>
                    <div style={{ flexGrow: 1 }}>
                        {/* The CityLogo component is used to display the city logo. */}
                        <div className='header_logo'>
                            <CityLogo
                                link={true}
                                linkTo={"/"}
                                width="70px"
                                height="70px"
                            />
                        </div>
                    </div>

                    {/* The following links are used to navigate to different pages. */}
                    <Link to="/the_team">
                        <Button color="inherit">The team</Button>
                    </Link>
                    <Link to="/the_matches">
                        <Button color="inherit">Matches</Button>
                    </Link>

                    {flag ?
                        <div>
                            {/* If the user is logged in, display a link to the dashboard */}
                            <Link to="/dashboard">
                                <Button color="inherit">Dashboard</Button>
                            </Link>
                            <Button
                                color='inherit'
                                onClick={() => this.logoutHandler()}
                            >Logout</Button>
                        </div>
                        :
                        <Link to="/sign_in">
                            <Button color="inherit">signin</Button>
                        </Link>
                    }
                </Toolbar>
            </AppBar >
        )
    }
}
