const newFormHandler = async (event) => {
  event.preventDefault();

  // TODO: Change all instances of 'project' to 'item' (keep same pluralization & capitalization)
  // TODO: Contextually change 'project-funding' to 'item-price'
  // TODO (stretch-goal): Add contact info and/or item edit button handlers

  const name = document.querySelector('#item-name').value.trim();
  const price = document.querySelector('#item-funding').value.trim();
  const description = document.querySelector('#item-desc').value.trim();
  const date = document.querySelector('#item-date').value.trim();
  const image = document.querySelector('#item-image').value.trim();

  if (name && price && description && date && image) {
    const response = await fetch(`/api/items`, {
      method: 'POST',
      body: JSON.stringify({ name, price, description, date, image }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create item');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/items/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete item');
    }
  }
};

document
  .querySelector('.new-item-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.item-list')
  .addEventListener('click', delButtonHandler);
