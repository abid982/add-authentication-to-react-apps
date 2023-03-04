import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

// Create an action
// The action function will be triggered whenever this AuthForm is submitted because it is on the same route as this AuthForm is on
// We must get the form data that was submitted
// The data package is given by react-router when the form is submitted
export async function action({ request, params }) {
  console.log('Request:');
  console.log(request);

  console.log('Params:');
  console.log(params);

  // Hold data with formData() method
  const data = await request.formData();

  // Now of course, we wanna send different requests based on the mode this form is in if we're in login or signup mode. So therefore we also must take a look at this query parameter in our action to find our whether a signup or login request should be sent. But the useSearch() hook is not working here because we're not in the Component Function

  // But we can use the built-in URL Constructor which is provided by the browser and pass our request.url to it

  // The URL() constructor returns a newly created URL object representing the URL defined by the parameters.

  // If the given base URL or the resulting URL are not valid URLs, the JavaScript TypeError exception is thrown.

  // Default browser feature
  const searchParams = new URL(request.url).searchParams;

  console.log('URL:');
  console.log(new URL(request.url));

  console.log('Search params:');
  console.log(searchParams);
  console.log(new URL('http://localhost:3001/auth?mode=login').searchParams);

  const mode = searchParams.get('mode') || 'login';
  console.log(mode);

  const email = data.get('email');
  console.log(email);

  console.log('Form data:');
  console.log(data);

  const password = data.get('password');
  console.log(password);

  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  console.log(authData);

  // Check mode if incorrect return
  if (mode !== 'login' && mode !== 'signup') {
    // Throw a new error response and import the json funciton from react-router-dom
    // For invalid input status 422
    console.log('TEST:');
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  console.log('Response:');
  console.log(response);

  // Code to handle response
  // Validation errors
  // 401 Invalid error from backend for example if we try to login with invalid credentials.
  if (response.status === 422 || response.status === 401) {
    // Return data to route component so that we can show the message there and show the validation errors next to the form for example
    // React router will automatically extract the data for you
    console.log('Testing...');
    return response;
  }
  // If we have any other error
  //   The 500 Internal Server Error is a very general HTTP status code
  // that means something has gone wrong on the web site's server
  // but the server could not be more specific on what the exact problem is.

  // Simple: I don't know what the **** just went wrong
  if (!response.ok) {
    // Throw error response so that our closest error element is rendered on the screen
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  // Extract token from response
  const resData = await response.json();
  console.log('Result data:');
  console.log(resData);
  const token = resData.token;
  console.log('Token:');
  console.log(token);

  // Store token
  localStorage.setItem('token', token);

  // Now if we make it past all these steps here the user creation or signup did succeed.
  // Soon: Manage that token

  // Just redirect the user
  // So once the user logged in redirect the user to homepage
  return redirect('/');

  // And if we now try to create a user,
  // with the same email as before, the password does not matter.
  // But if it's the same email as before,
  // you will see if I click save, nothing happens.
  // The reason for that is that, behind the scenes,
  // we're actually getting authentication errors,
  // because the backend checks
  // if a user with that email exists already,
  // and if that's the case,
  // it sends back an authentication error,
  // with status code 422.
  // And therefore,
  // now we just want to handle this on the frontend,
  // to show an appropriate error message,
  // because it's all working as it should,
  // but we are not giving the user the feedback
  // he or she should be getting.
}
