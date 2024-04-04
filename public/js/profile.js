// Create new item from form
const newFormHandler = async (ev) => {
  ev.preventDefault();

  // console.log('Submitting form data...');

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
    const response = await fetch('/api/items', {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());

    if (response.ok && responseData.success) {
      alert('New item created!');
      document.location.replace('/profile');
      console.log(responseData);
    } else {
      document.location.replace('/profile');
      console.log(responseData);
    }
  } catch (error) {
    console.error('Error creating item:', error);
  }
};

// const oldFormHandler = async (event) => {
//   event.preventDefault();

//   console.log("Submitting form data...");

//   // TODO: Change all instances of 'project' to 'item' (keep same pluralization & capitalization)
//   // TODO: Contextually change 'project-funding' to 'item-price'
//   // TODO (stretch-goal): Add contact info and/or item edit button handlers

//   const name = document.querySelector('#item-name').value.trim();
//   const item_price = document.querySelector('#item-price').value.trim();
//   const description = document.querySelector('#item-desc').value.trim();

//   if (name && item_price && description) {
//     const postData = {
//       name,
//       item_price,
//       description,
//     };
//     console.log("postData:", postData);

//     try {
//       const response = await fetch(`/api/items`, {
//         method: 'POST',
//         body: JSON.stringify(postData),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log("Response:", response);

//       if (response.ok) {
//         document.location.replace('/profile');
//       } else {
//         alert('Failed to create item');
//       }
//     } catch (error) {
//       console.error('Error creating item:', error);
//       alert('Failed to create item');
//     }
//   }
// };

//delete functionality
const delButtonHandler = async (event) => {
  const deleteButton = document.querySelector('.delete-button');

  if (deleteButton) {
    console.log('the delete works');
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/items/${id}`, {
      method: 'DELETE',
    });

    console.log('Response status:', response.status); // Log response status

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      const errorMessage = await response.text(); // Get error message from response body
      console.error('Failed to delete item:', errorMessage);
      document.location.replace('/profile');
    }
  } else {
    console.log('the delete DOES NOT work');
  }
};

document
  .querySelector('.new-item-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.delete-button')
  .addEventListener('click', delButtonHandler);
