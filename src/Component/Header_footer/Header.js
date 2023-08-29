import React from 'react'
import { AppBar, Toolbar, Button, } from '@mui/material';


import { Link, useNavigate } from "react-router-dom"
import { CityLogo } from "../Utils/Tools"
import { firebase } from "../../firebase"
import { showSuccessToast, showErrorToast } from "../Utils/Tools"
// import { LogoutHandler } from '../Utils/Tools';

import { connect } from "react-redux"
import {
    createLogoutAction
} from "../../Redux/action"


const Header = (props) => {
    const navigate = useNavigate();


    // const [user, setUser] = useState(false);
    // useEffect(() => {
    //     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             // user login
    //             setUser(true);
    //         } else {
    //             // user logout
    //             setUser(false);
    //         }
    //     });
    //     return () => unsubscribe();
    // })



    const logoutHandler = () => {
        firebase.auth().signOut()
            .then(() => {
                props.logoutAction(null)
                // console.log(props.loginState);
                showSuccessToast("Bye~")
                navigate("/")
            }).catch(error => {
                showErrorToast(error.message)
            })
    }

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

                {props.loginState !== null ?
                    <div>
                        {/* If the user is logged in, display a link to the dashboard */}
                        <Link to="/dashboard">
                            <Button color="inherit">Dashboard</Button>
                        </Link>
                        <Button
                            color='inherit'
                            onClick={() => logoutHandler()}
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

// 创建并暴露一个容器组件
export default connect(
    state => ({ loginState: state }),

    {
        logoutAction: createLogoutAction
    }
)(Header);
