import React, { useState } from 'react';
import { withFormik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Users from './Users';


function FormTemplate(props) {
    
    
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
                <ErrorMessage 
                name="role" 
                render={err => <div className="errorMessage">{err}</div>}/>
                <label>Role:
                    <Field as="select" name="role">
                        <option>Select a role</option>
                        <option>Student</option>
                        <option>Full-Stack Developer</option>
                        <option>Frontend Developer</option>
                        <option>Backend Developer</option>
                        <option>UX Designer</option>
                    </Field>
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
                    props.usersArray.length ===  0 ?
                    <div>
                            <span>There are no users present</span>
                        </div> :
                        props.usersArray.map((curr, index) => {
                            return (
                                <div key={index}>
                                    <Users 
                                    curr={curr}
                                    index={index}/>
                                </div>
                                 )
                                }) 
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
            terms: false,
            role: ""
        }
    },
    
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter your name"),
        email: Yup.string().required("Please provide a current email address"),
        terms: Yup.boolean(),
        role: Yup.string()
            .oneOf(["Student", "Full-Stack Developer", "Frontend Developer", "Backend Developer", "UX Designer"])
            .required("Please select your role")
    }),

    handleSubmit(userData, func){
        console.log(func)
        console.log(userData)
        axios.post("https://reqres.in/api/users", userData)
            .then(response => {
                console.log(response.data)
                func.resetForm()
                func.props.setUsersArray([...func.props.usersArray, response.data])
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    
})(FormTemplate)

export default UserForm;