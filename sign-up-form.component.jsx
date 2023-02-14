import { useState } from 'react';

// Created utility functions to make it easier to refactor code in the case of future changes to firebase code.
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up-form.styles.scss';

// default input for the state hook and is used to resset the form fields after a successful sign up
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    // Hook to keep track of the different fields in one object
    const [formFields, setFormFields] = useState(defaultFormFields);

    // destructured values for easier access to each field in the formFields object
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            // Creates the authenticated account in firebase
            const { user } = await createAuthUserWithEmailAndPassword(email, password);      
            
            // Creates the user in the firestore database with the display name from the form field
            await createUserDocumentFromAuth(user, { displayName });

            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create account, email already in use');
            } else {
                console.log('user creation encountered an error ' + error.message);
            }
        }
    }

    const handleChange = event => {
        const { name, value } = event.target;

        // sets the selected key taken from the name of the input field with the value from the input field
        setFormFields({...formFields, [name]: value});
    }

    return (
        // Sign up form
        <div className="sign-up-container">
            <h2>Don't Have an Account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={ handleSubmit }>
                <FormInput label='Display Name' type="text" onChange={ handleChange } name="displayName" value={displayName} required />
                <FormInput label='Email' type="email" onChange={ handleChange } name="email" value={email} required />
                <FormInput label='Password' type="password" onChange={ handleChange } name="password" minLength={6} value={password} required />
                <FormInput label='Confirm Password' type="passowrd" onChange={ handleChange } name="confirmPassword" minLength={6} value={confirmPassword} required />

                <Button type="submit">Create Account</Button>
            </form>
        </div>
    );
}

export default SignUpForm;