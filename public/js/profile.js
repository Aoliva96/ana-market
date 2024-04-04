// Create new item
const newFormHandler = async (event) => {
  event.preventDefault();

  const imageFileFieldElement = document.querySelector('#item-image');
  const formData = new FormData();

  formData.append('name', document.querySelector('#item-name').value.trim());
  formData.append(
    'item_price',
    document.querySelector('#item-price').value.trim()
  );
  formData.append(
    'description',
    document.querySelector('#item-desc').value.trim()
  );
  formData.append('image', imageFileFieldElement.files[0]);

  try {
    // KNOWN-ISSUE: Local dev server uses http connection, app expects https connection
    const response = await fetch('/api/items', {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());

    if (response.ok) {
      alert('New listing created successfully');
      document.location.replace('/profile');
    } else {
      // alert('Unable to create new listing');
      document.location.replace('/profile');
    }
  } catch (error) {
    console.error('Error creating item:', error);
  }
};

// Delete existing item
const delButtonHandler = async (event) => {
  // KNOWN-ISSUE: Delete button currently does not auto-delete images from Cloudinary
  if (event.target.classList.contains('delete-button')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/items/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      const errorMessage = await response.text();

      console.error(
        'Failed to delete item and/or Cloudinary image:',
        errorMessage
      );
      document.location.replace('/profile');
    }
  }
};

document
  .querySelector('.new-item-form')
  .addEventListener('submit', newFormHandler);

document.addEventListener('click', delButtonHandler);
