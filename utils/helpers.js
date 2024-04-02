module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },

  // TODO (stretch-goal): Modify emojis to refer to which item category the user selected, see here for list: https://www.w3schools.com/html/html_emojis.asp (if feature omitted remove the following code)

  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7) {
      return `<span for="img" aria-label="lightbulb">💡</span>`;
    } else if (randomNum > 0.4) {
      return `<span for="img" aria-label="laptop">💻</span>`;
    } else {
      return `<span for="img" aria-label="gear">⚙️</span>`;
    }
  },
  contact_seller: () => {
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
  },
  redirect_user: () => {
    function redirectToLoginPage() {
      // Save current page URL to localStorage
      localStorage.setItem('returnUrl', window.location.href);

      // Redirect to login page
      window.location.href = '/login';
    }
  },
};
