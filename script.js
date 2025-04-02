// Protección de la API Key usando un archivo .env o variable global
const apiKey = '686e8f50b2135e3c32f670ec018df888'; // Reemplaza con tu API Key (protege esta clave)

document.getElementById('searchButton').addEventListener('click', () => {
  const query = document.getElementById('movieSearch').value;
  if (query) {
    searchMovies(query);
  }
});

async function searchMovies(query) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      displayMovies(data.results);
    } else {
      document.getElementById('movieResults').innerHTML =
        '<p>No se encontraron películas.</p>';
    }
  } catch (error) {
    console.error('Error al buscar películas:', error);
    document.getElementById('movieResults').innerHTML =
      '<p>Ocurrió un error al buscar películas.</p>';
  }
}

function displayMovies(movies) {
  const movieResults = document.getElementById('movieResults');
  movieResults.innerHTML = ''; // Limpiar resultados anteriores

  movies.forEach((movie) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const posterPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'images/no-poster.jpg';
    const title = movie.title || 'Sin título';
    const releaseDate = movie.release_date || 'Fecha desconocida';
    const overview = movie.overview || 'Sin descripción';

    movieCard.innerHTML = `
      <img src="${posterPath}" alt="${title}">
      <h2>${title}</h2>
      <p><strong>Fecha de estreno:</strong> ${releaseDate}</p>
      <p><strong>Descripción:</strong> ${overview}</p>
    `;

    movieResults.appendChild(movieCard);
  });
}
