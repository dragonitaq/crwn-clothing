import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDoc } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Password don't match");
      return;
    }

    try {
      /* createUserWithEmailAndPassword automatically sign in user after user is created. The return object has the user details in the user key value, that we why we destructure it. */
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      /* We pass displayName as object because in this fn we will handle it as an object. */
      await createUserProfileDoc(user, { displayName });

      /* After we created the new user, we then clear up our form. */
      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    /* When we get name=displayName as target, using [name] will extract its value pair which is displayName. Same with value. */
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I don't have an account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput type='text' name='displayName' value={displayName} handleChange={this.handleChange} label='Display Name' required />
          <FormInput type='email' name='email' value={email} handleChange={this.handleChange} label='Email' required />
          <FormInput type='password' name='password' value={password} handleChange={this.handleChange} label='Password' required />
          <FormInput type='password' name='confirmPassword' value={confirmPassword} handleChange={this.handleChange} label='Confirm Password' required />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
