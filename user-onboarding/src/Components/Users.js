import React from 'react';
import { withFormik, Form, Field, ErrorMessage, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


function DisplayUsers(props) {

    return(
        <div>
        <div key={props.index}>
            <h4>Name: {props.curr.name}</h4>
            <p>Email: {props.curr.email}</p>
        </div>
        <button >Edit</button>

        </div>
    )
}

const Users = withFormik({
    mapPropsToValues() {
        return {
            name: "",
            email: "",
            password: "",
            terms: false
        }
    },

 


})(DisplayUsers)

export default Users;