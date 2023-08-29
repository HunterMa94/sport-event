import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { firebase } from "../../firebase"

import { FormHelperText } from '@mui/material'

import mCitylogo from "../../Resources/images/logos/manchester_city_logo.png"

/**
 * CityLogo component displays the city logo as an image cover.
 * @param {object} props - The component props.
 * @param {boolean} props.link - Determines if the logo should be wrapped in a link.
 * @param {string} props.linkTo - The URL to navigate when the logo is clicked (if props.link is true).
 */
export const CityLogo = (props) => {

    const template = <div
        className='img_cover'
        style={{
            width: props.width,
            height: props.height,
            background: `url(${mCitylogo})`
        }}
    ></div>

    // If props.link is true, wrap the logo in a link element with the specified URL.
    if (props.link) {
        return (
            <Link className='link_logo' to={props.linkTo}>
                {template}
            </Link>
        )
    } else {
        // Otherwise, just return the logo template.
        return template
    }

}

export const Tag = (props) => {
    const template = <div
        style={{
            background: props.bck ? props.bck : "#ffffff",
            fontSize: props.size ? props.size : "15px",
            color: props.color ? props.color : "#000000",
            padding: "5px 10px",
            display: "inline-block",
            fontFamily: "Righteous",
            ...props.add
        }}
    >
        {props.children}
    </div>

    if (props.link) {
        return (
            <Link to={props.linkTo}>
                {template}
            </Link>
        )
    } else {
        return template
    }
}

export const showErrorToast = (msg) => {
    toast.error(msg, {
        position: toast.POSITION.TOP_LEFT
    })
}

export const showSuccessToast = (msg) => {
    toast.success(msg, {
        position: toast.POSITION.TOP_LEFT
    })
}

export const textErrorHelper = (formik, value) => ({
    error: formik.errors[value] && formik.touched[value],
    helperText: formik.errors[value] && formik.touched[value] ? formik.errors[value] : null
})

export const selectErrorHelper = (formik, value) => {
    if (formik.errors[value] && formik.touched[value]) {
        return (<FormHelperText>{formik.errors[value]}</FormHelperText>)
    }
    return false;
}

export const selectIsError = (formik, value) => {
    return formik.errors[value] && formik.touched[value];
}


/* export const LogoutHandler = (props) => {
    const navigate = useNavigate();
    firebase.auth().signOut()
        .then(() => {
            props.logoutAction(null)
            // console.log(props.loginState);
            showSuccessToast("Bye~")
            navigate("/")
        }).catch(error => {
            showErrorToast(error.message)
        })
} */