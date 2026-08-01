let quotes = [];

fetch('./quotes.json')
  .then(response => response.json())
  .then(data => {
    quotes = data;
    displayQuotes(quotes);
  })
  .catch(error => console.error('Error al cargar las citas:', error));

const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');

function displayQuotes(items) {
  resultsContainer.innerHTML = '';
  
  if (!items || items.length === 0) {
    resultsContainer.innerHTML = '<p>No se encontraron citas.</p>';
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    
    // Mostramos libro solo si existe, y páginas si existen
    const bookInfo = item.book ? `, ${item.book}` : '';
    const pageInfo = item.page ? ` (${item.page})` : '';
    const tagsInfo = item.tags ? item.tags.join(', ') : '';

    card.innerHTML = `
      <p>"${item.quote}"</p>
      <p><strong>— ${item.author || 'Autor desconocido'}</strong>${bookInfo}${pageInfo}</p>
      ${tagsInfo ? `<small><strong>Etiquetas:</strong> ${tagsInfo}</small>` : ''}
    `;
    resultsContainer.appendChild(card);
  });
}

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();

  const filtered = quotes.filter(item => {
    const quoteMatch = item.quote ? item.quote.toLowerCase().includes(searchTerm) : false;
    const authorMatch = item.author ? item.author.toLowerCase().includes(searchTerm) : false;
    const bookMatch = item.book ? item.book.toLowerCase().includes(searchTerm) : false;
    const tagsMatch = item.tags ? item.tags.some(tag => tag.toLowerCase().includes(searchTerm)) : false;

    return quoteMatch || authorMatch || bookMatch || tagsMatch;
  });

  displayQuotes(filtered);
});