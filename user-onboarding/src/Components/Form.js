import React, { useState } from 'react';
import { withFormik, Form, Field, ErrorMessage, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Users from './Users';

let usersArray = [];

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
            <div>
                {
                    usersArray.length >= 0 ?
                    usersArray.map((curr, index) => {
                        return (
                            <div key={index}>
                                <Users 
                                curr={curr}
                                index={index}/>
                            </div>
                        )
                    }) :
                    <div>
                        <span>There are no users present</span>
                    </div>
                }
            </div>

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
                console.log(response.data)
                func.resetForm()
                usersArray.push(response.data)
                console.log(usersArray)
            })
            .catch(error => {
                console.log(error.message)
            })
    }


})(FormTemplate)

export default UserForm;