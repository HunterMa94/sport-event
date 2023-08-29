import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { firebase } from "../firebase"

import { connect } from "react-redux"


function AuthGuard(props) {
    const navigate = useNavigate();

    React.useEffect(() => {
        const authCheck = () => {
            // const user = firebase.auth().currentUser;
            // if no user login jump to sign in page
            if (props.loginState === null) {
                // console.log(props.loginState);
                navigate("/sign_in");
            }
        }
        authCheck();
    }, [navigate, props.loginState]);

    // console.log("D:", props.loginState);
    return props.loginState !== null ? props.children : null;
}

export default connect(
    state => ({ loginState: state }),
)(AuthGuard);
