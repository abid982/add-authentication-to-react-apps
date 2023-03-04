export function getAuthToken() {
  const token = localStorage.getItem('token');

  // More code later
  return token;
}

export function loader() {
  console.log('Loader function:');
  console.log(getAuthToken());
  return getAuthToken();
}
