import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function FormTemplate() {

    return(
        <div>
            <Form>
                <label>Name: 
                    <Field 
                        type="text"
                        placeholder="Enter your name" 
                        />
                </label>
                <label>Email: 
                    <Field 
                        type="email"
                        placeholder="Enter your current email" 
                        />
                </label>
                <label>Password: 
                    <Field 
                        type="text"
                        placeholder="Password" 
                        />
                </label>
                <label>Terms of service 
                    <Field 
                        type="checkbox"
                        />
                </label>
                <input type="submit" />
            </Form>

        </div>
    )
}

const UserForm = withFormik({

})(FormTemplate)

export default UserForm;