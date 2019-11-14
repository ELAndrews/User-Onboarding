import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


function DisplayUsers(props) {

    return(
        <div className="userContainer">
        <div key={props.index}>
            <h4>Name: {props.curr.name}</h4>
            <p>Email: {props.curr.email}</p>
            <p>Role: {props.curr.role}</p>
        </div>
        {/* <button className="editBtn">Edit</button> */}

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