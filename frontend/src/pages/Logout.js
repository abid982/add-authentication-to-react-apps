import { redirect } from 'react-router-dom';

export function action() {
  // Remove token
  localStorage.removeItem('token');

  // Redirect the user to the home page if a user logs out
  return redirect('/');
}
