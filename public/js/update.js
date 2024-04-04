function redirectToLoginPage() {
  // Save current page URL to localStorage
  localStorage.setItem('returnUrl', window.location.href);
  // Redirect to login page
  window.location.href = '/login';
}

// Contact Seller button show/hide
const contactButtonHandler = async (event) => {
  event.preventDefault();

  const contactInfo = document.getElementById('contact-info');
  const contactButton = document.querySelector('.contact-button');

  if (contactInfo.style.display === 'none') {
    contactInfo.style.display = 'block';
    contactButton.textContent = 'Hide Contact Information';
  } else {
    contactInfo.style.display = 'none';
    contactButton.textContent = 'Contact Seller';
  }
};

// Edit item button
const editButtonHandler = async (event) => {
  event.preventDefault();

  const form = document.querySelector('.update-item-form');
  form.style.display = 'block';
};

// Edit item form submit button
const editSubmitHandler = async (event) => {
  event.preventDefault();

  // Collect form values
  const name = document.querySelector('#update-item-name').value.trim();
  const item_price = document.querySelector('#update-item-price').value.trim();
  const description = document.querySelector('#update-item-desc').value.trim();

  // Collect item ID
  const pathName = window.location.pathname;
  const pathParts = pathName.split('/');
  const id = pathParts[pathParts.length - 1];

  // PUT request to item/:id
  if (id && name && item_price && description) {
    const response = await fetch(`/api/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name,
        item_price,
        description,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If response ok replace item with updated values
    if (response.ok) {
      alert('Listing updated successfully');
      document.location.replace(`/item/${id}`);
    } else {
      console.error('Error editing item');
      alert('Unable to edit listing');
    }
  }
};

document
  .querySelector('.contact-button')
  .addEventListener('click', contactButtonHandler);
document
  .querySelector('.edit-button')
  .addEventListener('click', editButtonHandler);
document
  .querySelector('.update-item-form')
  .addEventListener('submit', editSubmitHandler);
