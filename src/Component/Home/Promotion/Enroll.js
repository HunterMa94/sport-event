import React, { useState } from 'react'
import { Fade } from "react-awesome-reveal"
import { CircularProgress } from "@mui/material"

import { useFormik } from "formik"
import * as Yup from "yup"

import { showErrorToast, showSuccessToast } from '../../Utils/Tools'
import { promotionsCollection } from "../../../firebase"

export default function Enroll() {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: { email: "" },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invaild email")
                .required("The email is required")
        }),
        onSubmit: (values, { resetForm }) => {
            setLoading(true);
            submitForm(values)
        }
    })

    const submitForm = async (values) => {
        try {
            const isOnTheList = await promotionsCollection.where("email", '==', values.email).get();

            if (isOnTheList.docs.length >= 1) {
                showErrorToast("Sorry you are on the list already");
                setLoading(false);
                return false;
            }

            await promotionsCollection.add({ email: values.email });
            formik.resetForm();
            setLoading(false);
            showSuccessToast("Congratulation !!");
        } catch (error) {

        }
    }

    return (
        <Fade>
            <div className='enroll_wrapper'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='enroll_title'>
                        Enter your email
                    </div>
                    <div className='enroll_input'>
                        <input
                            name='email'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder="Enter you email"
                        />
                        {formik.touched.email && formik.errors.email ?
                            <div className='error_label'>
                                {formik.errors.email}
                            </div>
                            : null}

                        {loading ?
                            <CircularProgress color='secondary' className='progress'></CircularProgress>
                            : <button
                                type='submit'
                            >
                                Enroll
                            </button>}
                        <div className='enroll_discl'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
                            dignissim sit amet, adipiscing nec, ultricies sed.
                        </div>
                    </div>
                </form>
            </div>
        </Fade>
    )
}
