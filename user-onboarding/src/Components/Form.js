import React from 'react';
import { withFormik, Form, Field, ErrorMessage, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function FormTemplate() {

    return(
        <div>
            <Form>
                <ErrorMessage 
                name="name" 
                render={err => <div className="errorMessage">{err}</div>}/>
                <label>Name: 
                    <Field 
                        type="text"
                        name="name"
                        placeholder="Enter your name" 
                        />
                </label>
                <ErrorMessage 
                name="email" 
                render={err => <div className="errorMessage">{err}</div>}/>
                <label>Email: 
                    <Field 
                        type="email"
                        name="email"
                        placeholder="Enter your current email" 
                        />
                </label>
                <label>Password: 
                    <Field 
                        type="text"
                        name="password"
                        placeholder="Password" 
                        />
                </label>
                <label>Terms of service 
                    <Field 
                        type="checkbox"
                        name="terms"
                        />
                </label>
                <input type="submit" />
            </Form>

        </div>
    )
}

const UserForm = withFormik({
    mapPropsToValues() {
        return {
            name: "",
            email: "",
            password: "",
            terms: false
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter your name"),
        email: Yup.string().required("Please provide a current email address"),
        terms: Yup.boolean()
        }),

    handleSubmit(userData, func) {
        axios.post("https://reqres.in/api/users", userData)
            .then(response => {
                console.log(response)
                func.resetForm()
            })
            .catch(error => {
                console.log(error.message)
            })
    }


})(FormTemplate)

export default UserForm;