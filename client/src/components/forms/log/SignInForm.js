import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//* UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { AiFillGoogleCircle } from 'react-icons/ai';

//* Import files
import useFormsHook from '../../../utils/formsHook';
import * as Actions from '../../../store/actions';
import globalConfig from '../../../configuration/globalConfig';
import myHistory from '../../../utils/history';

//* Google
import { GoogleLogin } from 'react-google-login';

const SignInForm = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const uncompleted = useSelector((kinaccess) => kinaccess.formsReducer.signInForm.failed);

   const [signInValues, setSignInValues] = useState({
      email: '',
      password: '',
   });

   const submitForm = (e) => {
      e.preventDefault();
      dispatch(Actions.signInFormAction(signInValues));
   };

   const googleSuccess = async (res) => {
      const result = res?.profileObj;
      const token = res?.tokenId;

      try {
         dispatch(Actions.googleAuthAction({ result, token }));
         myHistory.push('/');
         console.log(myHistory);
      } catch (err) {
         console.log(err);
      }
   };

   const goBack = () => {
      myHistory.push('/contact');
      // console.log(myHistory);
      //* exemple of history.push with react-router v6
      // navigate('/');
      // console.log(navigate);
   };

   const googleFailure = () => {
      console.log('google auth failed');
   };

   return (
      <section className='log-form'>
         <form>
            <TextField
               className='field'
               name='email'
               value={signInValues.email}
               label='email'
               variant='outlined'
               required
               fullWidth
               error={uncompleted?.email ? true : false}
               onChange={(e) => {
                  useFormsHook.handleChange(e, setSignInValues);
               }}
            />
            <strong>{uncompleted?.email}</strong>
            <TextField
               className='field'
               name='password'
               value={signInValues.password}
               label='Mot de passe'
               variant='outlined'
               type='password'
               required
               fullWidth
               error={uncompleted?.password ? true : false}
               onChange={(e) => {
                  useFormsHook.handleChange(e, setSignInValues);
               }}
            />
            <strong>{uncompleted?.password}</strong>
            <Button
               className='btn-submit'
               onClick={submitForm}
               type='submit'
               // color='rgba(0,61,217)'
               variant='contained'
               endIcon={<KeyboardArrowRightIcon />}
            >
               Connectez-vous
            </Button>
            <GoogleLogin
               clientId={globalConfig.GOOGLE_ID}
               render={(renderProps) => (
                  <Button
                     className='google-button'
                     onClick={renderProps.onClick}
                     disabled={renderProps.disabled}
                     startIcon={<AiFillGoogleCircle />}
                     variant='contained'
                  >
                     Continuer avec google
                  </Button>
               )}
               onSuccess={googleSuccess}
               onFailure={googleFailure}
               cookiePolicy='single_host_origin'
            />
         </form>
         <Button onClick={goBack}>go back home</Button>
      </section>
   );
};

export default SignInForm;
