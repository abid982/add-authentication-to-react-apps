// import { useState } from 'react';
import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const data = useActionData();
  console.log('Data:');
  console.log(data);

  // Two elements in an array
  // First is an object that gives us access to the currently set query parameters.
  // Second is a function that allows us to update the currently set query parameters.
  // Note: We don't need searchParams function
  const [searchParams, setSearchParams] = useSearchParams();

  // Store information
  // The get method to retrieve the value for a specific query parameter
  // Retrieve value of mode parameter
  // Returns a Boolean Value

  console.log();
  const isLogin = searchParams.get('mode') === 'login';
  console.log('Is login:');
  console.log(isLogin);

  // The useNavigation() hook
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  // const [isLogin, setIsLogin] = useState(true);

  // function switchAuthHandler() {
  //   setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  // }

  return (
    // <>
    //   <Form method="post" className={classes.form}>
    //     <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
    //     <p>
    //       <label htmlFor="email">Email</label>
    //       <input id="email" type="email" name="email" required />
    //     </p>
    //     <p>
    //       <label htmlFor="image">Password</label>
    //       <input id="password" type="password" name="password" required />
    //     </p>
    //     <div className={classes.actions}>
    //       <button onClick={switchAuthHandler} type="button">
    //         {isLogin ? 'Create new user' : 'Login'}
    //       </button>
    //       <button>Save</button>
    //     </div>
    //   </Form>
    // </>

    <>
      <Form method="post" className={classes.form}>
        {/* If we have data and errors */}
        {/* Loop through all errors */}
        {/* Loop through error object with the built in JavaScript Object */}
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        {/* If data has message property on this data object */}

        {data && data.message && <p>{data.message}</p>}

        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          {/* <Link to="?mode=signup"> */}
          {/* <Link to="?mode=login"> */}
          {/* {isLogin ? 'Create new user' : 'Login'} */}
          {/* Opposite mode */}
          {/* If we are on login then setup to signup and vice-versa */}
          {/* Setup dynamically */}
          {/* Manage mode with query parameter */}
          {/* If isLogin is true i.e mode===login then the new mode should be set to signup other set to login */}
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
