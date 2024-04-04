const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send POST request to API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Retrieve return URL from localStorage
      const returnUrl = localStorage.getItem('returnUrl');

      // If return URL exists, delete from storage & redirect user
      if (returnUrl) {
        localStorage.removeItem('returnUrl');
        document.location.replace(returnUrl);
      } else {
        // If successful, redirect to user profile
        document.location.replace('/profile');
      }
    } else {
      alert('Invalid username/password entered');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from signup form
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const phone = document.querySelector('#phone-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && phone && password) {
    // Send POST request to API endpoint
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, phone, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If successful, redirect to user profile
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      console.error('Error, unable to create new user');
    }
  } else {
    alert('Unable to signup. Name/Email/Password are required fields');
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
