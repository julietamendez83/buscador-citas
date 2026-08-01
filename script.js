let quotes = [];

fetch('quotes.json')
  .then(response => response.json())
  .then(data => {
    quotes = data;
    displayQuotes(quotes);
  });

const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');

function displayQuotes(items) {
  resultsContainer.innerHTML = '';
  if (items.length === 0) {
    resultsContainer.innerHTML = 'No se encontraron citas.';
    return;
  }
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      "${item.quote}"
      — ${item.author}, ${item.book}
      Etiquetas: ${item.tags.join(', ')}
    `;
    resultsContainer.appendChild(card);
  });
}

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = quotes.filter(item => {
    return (
      item.quote.toLowerCase().includes(searchTerm) ||
      item.author.toLowerCase().includes(searchTerm) ||
      item.book.toLowerCase().includes(searchTerm) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  });
  displayQuotes(filtered);
});