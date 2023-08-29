import React, { useState } from 'react'
import { firebase } from '../../firebase';
import { useNavigate } from "react-router-dom"

import { CircularProgress } from "@mui/material"

import { useFormik } from 'formik';
import * as Yup from "yup";
import { showSuccessToast, showErrorToast } from "../Utils/Tools"

import { connect } from "react-redux"
import {
    createLoginAction
} from "../../Redux/action"

const Signin = (props) => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();




    /**
     * useFormik is a custom hook provided by Formik library to handle form state and form submission.
     * It initializes form state, form validation schema, and form submission logic.
     *
     * @param {object} initialValues - An object containing initial values for form fields.
     * @param {object} validationSchema - A Yup validation schema object for form field validation.
     * @param {function} onSubmit - A callback function to be executed when the form is submitted.
     *                               It receives the form values as its argument.
     * @returns {object} formik - An object containing form state and helper functions for form handling.
     */
    const formik = useFormik({
        initialValues: {
            email: "mx690017636@gmail.com",
            password: 'qwer1234'
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invaild email address")
                .required("The email is required"),
            password: Yup.string()
                .required("The password is required"),
        }),

        onSubmit: (value) => {
            setLoading(true);
            // console.log(value);
            submitForm(value)
        }
    })

    const submitForm = (value) => {
        firebase.auth()
            .signInWithEmailAndPassword(
                value.email,
                value.password
            ).then(() => {
                setLoading(false);
                // set redux
                props.loginAction(firebase.auth().currentUser)
                // console.log(props.loginState);
                showSuccessToast("Welcome back!!");
                navigate("/dashboard");
            }).catch((error) => {
                setLoading(false);
                // show toasts
                // alert(error)
                showErrorToast(error.message)
            })
    }

    return (
        <>
            <div className='container'>
                <div className='signin_wrapper' style={{ margin: "100px" }}>
                    <form onSubmit={formik.handleSubmit}>
                        <h2>Please login</h2>
                        <input
                            name='email'
                            placeholder='Email'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        ></input>
                        {formik.touched.email && formik.errors.email ?
                            // If the "email" field has been touched and there is a validation error for it,
                            // display the error label.
                            <div className='error_label'>
                                {formik.errors.email}
                            </div>
                            : null}
                        <input
                            name='password'
                            type='password'
                            placeholder='Password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        ></input>

                        {formik.touched.password && formik.errors.password ?
                            // If the "password" field has been touched and there is a validation error for it,
                            <div className='error_label'>
                                {formik.errors.password}
                            </div>
                            : null}

                        {loading ?
                            <CircularProgress
                                color='secondary'
                                className='progress' />
                            : <button type='submit'>Login</button>}

                    </form>
                </div>
            </div>
        </>
    )
}


// 创建并暴露一个容器组件
export default connect(
    state => ({ loginState: state }),

    {
        loginAction: createLoginAction
    }
)(Signin);
