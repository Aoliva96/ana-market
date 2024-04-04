function redirectToLoginPage() {
  // Save current page URL to localStorage
  localStorage.setItem('returnUrl', window.location.href);
  // Redirect to login page
  window.location.href = '/login';
}

document.addEventListener('DOMContentLoaded', function () {
  const contactButton = document.getElementById('toggle-contact-info');
  const contactInfo = document.getElementById('contact-info');
  if (contactButton && contactInfo) {
    contactButton.addEventListener('click', function () {
      if (contactInfo.style.display === 'none') {
        contactInfo.style.display = 'block';
        contactButton.textContent = 'Hide Contact Information';
      } else {
        contactInfo.style.display = 'none';
        contactButton.textContent = 'Contact Seller';
      }
    });
  }
});

//update button functionality
const editButtonHandler = async (event) => {
  event.preventDefault();

  //   //get the id from the window.location

  const form = document.querySelector('.update-item-form');
  form.style.display = 'block';
};
const editSubmitHandler = async (event) => {
  const name = document.querySelector('#update-item-name').value.trim();
  const item_price = document.querySelector('#update-item-price').value.trim();
  const description = document.querySelector('#update-item-desc').value.trim();
  const pathname = window.location.pathname;
  const parts = pathname.split('/');
  const id = parts[parts.length - 1];
  //the put request to the item/:id
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
    console.log(response);
    //if the response is ok replace the page with the updated item
    if (response.ok) {
      console.log('Update was pushed');
      document.location.replace(`/item/${id}`);
    } else {
      consol.log('Failed to edit item, response was not OK');
    }
  } else {
    console.log('This whole if statement did not work, the PUT method');
  }

  console.log('Edit button was clicked');
};

document
  .querySelector('.edit-button')
  .addEventListener('click', editButtonHandler);
document
  .querySelector('.update-item-form')
  .addEventListener('submit', editSubmitHandler);
