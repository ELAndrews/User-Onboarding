import React from 'react';
import { withFormik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Users from './Users';


function FormTemplate(props) {
    
    
    return(
        <div>
            <Form className="formContainer">
                <label>Name: <br />
                    <Field 
                        className="formInput"
                        type="text"
                        name="name"
                        placeholder="Enter your name" 
                        />
                </label><br/>
                <ErrorMessage 
                name="name" 
                render={err => <div className="errorMessage">{err}</div>}/> <br/>
                <label>Email: <br />
                    <Field 
                        className="formInput"
                        type="email"
                        name="email"
                        placeholder="Enter your current email" 
                        />
                </label><br/>
                <ErrorMessage 
                name="email" 
                render={err => <div className="errorMessage">{err}</div>}/><br/>
                <label>Password: <br />
                    <Field 
                        type="text"
                        name="password"
                        placeholder="Password" 
                        className="formInput"
                        />
                </label><br/>
                <ErrorMessage 
                name="password" 
                render={err => <div className="errorMessage">{err}</div>}/><br/>
                <label>Role: <br />
                    <Field as="select" name="role" className="formInput">
                        <option>Select a role</option>
                        <option>Student</option>
                        <option>Full-Stack Developer</option>
                        <option>Frontend Developer</option>
                        <option>Backend Developer</option>
                        <option>UX Designer</option>
                    </Field>
                </label><br/>
                <ErrorMessage 
                name="role" 
                render={err => <div className="errorMessage">{err}</div>}/><br/>
                <label>Terms of service 
                    <Field 
                        type="checkbox"
                        name="terms"
                        />
                </label><br/>
                <ErrorMessage 
                name="terms" 
                render={err => <div className="errorMessage">{err}</div>}/><br/><br/>
                <input className="submitBtn" type="submit" />
            </Form>
            <div className="usersList">
                {
                    props.usersArray.length ===  0 ?
                    <div className="userContainer">
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
        name: Yup.string().required("*Please enter your name"),
        email: Yup.string().required("*Please provide a current email address"),
        password: Yup.string()
                .required("*No password entered")
                .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, `Your password must be at least 6 characters, inculding at least 1 letter and 1 number`),
        terms: Yup.boolean()
                .oneOf([true], "You must read and accept our terms."),
        role: Yup.string()
            .oneOf(["Student", "Full-Stack Developer", "Frontend Developer", "Backend Developer", "UX Designer"])
            .required("*Please select your role")
    }),

    handleSubmit(userData, formikbag){
        console.log(formikbag)
        console.log(userData)
        axios.post("https://reqres.in/api/users", userData)
            .then(response => {
                console.log(response.data)
                formikbag.resetForm()
                formikbag.props.setUsersArray([...formikbag.props.usersArray, response.data])
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    
})(FormTemplate)

export default UserForm;