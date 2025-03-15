// Initialize quotes from localStorage or an empty array
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// DOM Elements
const form = document.getElementById('quoteForm');
const quotesGrid = document.getElementById('quotesGrid');
const categoriesTabs = document.getElementById('categoriesTabs');

// Function to create a quote card
function createQuoteElement(quote, index) {
  const card = document.createElement('div');
  card.className = 'quote-card';
  card.dataset.category = quote.category;
  card.innerHTML = `
    <p class="quote-text">${quote.text}</p>
    <p class="quote-author">— ${quote.author || 'Anonymous'}</p>
  `;
  addDeleteButton(card, index); // Add delete button
  return card;
}

// Function to add a delete button to a quote card
function addDeleteButton(card, index) {
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => {
    quotes.splice(index, 1); // Remove the quote from the array
    localStorage.setItem('quotes', JSON.stringify(quotes)); // Update localStorage
    card.remove(); // Remove the quote card from the DOM
    showConfirmationMessage('Quote deleted successfully!'); // Show confirmation message
  });
  card.appendChild(deleteBtn);
}

// Function to display all quotes
function displayQuotes() {
  quotesGrid.innerHTML = ''; // Clear the grid
  quotes.forEach((quote, index) => {
    quotesGrid.appendChild(createQuoteElement(quote, index));
  });
}

// Function to filter quotes by category
function filterQuotes(category) {
  const allQuotes = document.querySelectorAll('.quote-card');
  allQuotes.forEach(quote => {
    if (category === 'All' || quote.dataset.category === category) {
      quote.style.display = 'block';
    } else {
      quote.style.display = 'none';
    }
  });
}

// Event listener for category tabs
categoriesTabs.addEventListener('click', (e) => {
  if (e.target.classList.contains('category-tab')) {
    document.querySelectorAll('.category-tab').forEach(tab => tab.classList.remove('active'));
    e.target.classList.add('active');
    const selectedCategory = e.target.dataset.category;
    filterQuotes(selectedCategory);
  }
});

// Event listener for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const newQuote = {
    text: document.getElementById('quoteInput').value,
    author: document.getElementById('authorInput').value.trim(),
    category: document.getElementById('categoryInput').value
  };

  quotes.push(newQuote);
  localStorage.setItem('quotes', JSON.stringify(quotes));
  quotesGrid.prepend(createQuoteElement(newQuote, quotes.length - 1)); // Add new quote to the top
  form.reset(); // Clear the form
  showConfirmationMessage('Quote added successfully!'); // Show confirmation message
});

// Function to show a confirmation message
function showConfirmationMessage(message) {
  const confirmationMessage = document.createElement('div');
  confirmationMessage.className = 'confirmation-message show-message';
  confirmationMessage.textContent = message;
  document.body.appendChild(confirmationMessage);

  // Remove the message after 3 seconds
  setTimeout(() => {
    confirmationMessage.remove();
  }, 3000);
}

// Dark Mode Toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.textContent = 'Toggle Dark Mode';
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
document.querySelector('.header').appendChild(darkModeToggle);

// Initial load: Display all quotes
displayQuotes();