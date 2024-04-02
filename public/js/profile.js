const handleImageUploadSubmit = async (ev) => {
  ev.preventDefault();

  const imageFileFieldElement = document.querySelector("#item-image");
  const formData = new FormData();

  formData.append("image", imageFileFieldElement.files[0]);

  try {
    const response = await fetch("/api/images/upload", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    console.log(response); // for debugging

    // If the image was successfully uploaded, you can handle it as needed
    if (response.success) {
      alert("Image uploaded successfully!");
    } else {
      alert("Failed to upload image");
    }
  } catch (err) {
    console.error("Error uploading image:", err);
    alert("Failed to upload image");
  }
};

const newFormHandler = async (event) => {
  event.preventDefault();

  console.log("Submitting form data...");

  // TODO: Change all instances of 'project' to 'item' (keep same pluralization & capitalization)
  // TODO: Contextually change 'project-funding' to 'item-price'
  // TODO (stretch-goal): Add contact info and/or item edit button handlers

  const name = document.querySelector('#item-name').value.trim();
  const item_price = document.querySelector('#item-price').value.trim();
  const description = document.querySelector('#item-desc').value.trim();

  if (name && item_price && description) {
    const postData = {
      name,
      item_price,
      description,
    };
    console.log("postData:", postData);

    try {
      const response = await fetch(`/api/items`, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("Response:", response);

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create item');
      }
    } catch (error) {
      console.error('Error creating item:', error);
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
