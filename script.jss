// Initialize quotes from localStorage or an empty array
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// DOM Elements
const form = document.getElementById('quoteForm');
const quotesGrid = document.getElementById('quotesGrid');
const categoriesTabs = document.getElementById('categoriesTabs');

// Function to create a quote card
function createQuoteElement(quote) {
  const card = document.createElement('div');
  card.className = 'quote-card';
  card.dataset.category = quote.category;
  card.innerHTML = `
    <p class="quote-text">${quote.text}</p>
    <p class="quote-author">— ${quote.author || 'Anonymous'}</p>
  `;
  return card;
}

// Function to display all quotes
function displayQuotes() {
  quotesGrid.innerHTML = ''; // Clear the grid
  quotes.forEach(quote => {
    quotesGrid.appendChild(createQuoteElement(quote));
  });
}

// Function to filter quotes by category
function filterQuotes(category) {
  const allQuotes = document.querySelectorAll('.quote-card');
  allQuotes.forEach(quote => {
    quote.style.display = (category === 'All' || quote.dataset.category === category) 
      ? 'block' 
      : 'none';
  });
}

// Event listener for category tabs
categoriesTabs.addEventListener('click', (e) => {
  if (e.target.classList.contains('category-tab')) {
    document.querySelectorAll('.category-tab').forEach(tab => tab.classList.remove('active'));
    e.target.classList.add('active');
    filterQuotes(e.target.dataset.category);
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
  quotesGrid.prepend(createQuoteElement(newQuote)); // Add new quote to the top
  form.reset(); // Clear the form
});

// Initial load: Display all quotes
displayQuotes();