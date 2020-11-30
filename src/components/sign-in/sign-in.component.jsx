import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // After signing in successfully, we clean up the state.
      this.setState({ email: '', password: '' });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    /* This method is called Computed Property Names form ES6. For more, visit https://ui.dev/computed-property-names */
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput name='email' type='email' value={this.state.email} handleChange={this.handleChange} label='Email' required />

          <FormInput name='password' type='password' value={this.state.password} handleChange={this.handleChange} label='Password' required />

          <div className='buttons'>
            <CustomButton type='submit'>Sign In</CustomButton>
            {/* In React props (in this case: 'isGoogleSignIn') will pass (carry) a value of TRUE if we don't assign value to it.
            When we click signInWithGoogle button, a popup will appear, but the form element will ask user to fill in the form. Because any buttons inside of a form element will cause the form to treat them all as type="submit" by default. We don't want that for our google sign in button though, so just make sure to add type="button" to our google sign in CustomButton. */}
            <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
              Sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
