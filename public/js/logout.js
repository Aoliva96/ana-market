const logout = async () => {
  // Send POST request to API endpoint
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  // If successful, redirect to homepage
  if (response.ok) {
    document.location.replace('/');
  } else {
    console.error('Failed to logout user');
    alert('Unable to logout, please try again');
  }
};

document.querySelector('#logout').addEventListener('click', logout);
