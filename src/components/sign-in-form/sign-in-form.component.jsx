import { useState } from 'react';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);

            resetFormFields();
        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect email or password');
                    break;
                case 'auth/user-not-found':
                    alert('User does not exist');
                    break;
                case 'auth/too-many-requests':
                    alert('Too many failed attempts. Try again later or reset your password');
                    break;
                default:
                    console.log(error.message);
                    break;
            }
        }
    }

    const handleChange = event => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={ handleSubmit }>
                <FormInput label='Email' type="email" onChange={ handleChange } name="email" value={email} required />
                <FormInput label='Password' type="password" onChange={ handleChange } name="password" minLength={6} value={password} required />

                <div className='buttons-container'>
                    <Button type="submit">Sign in</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
                
            </form>
        </div>
    );
}

export default SignInForm;