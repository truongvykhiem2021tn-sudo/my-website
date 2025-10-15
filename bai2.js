const movies = [
  {
    title: "Inception",
    year: 2010,
    genre: ["Hành động", "Khoa học viễn tưởng"],
    poster: "https://image.tmdb.org/t/p/w300/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg"
  },
  {
    title: "Interstellar",
    year: 2014,
    genre: ["Phiêu lưu", "Khoa học viễn tưởng"],
    poster: "https://image.tmdb.org/t/p/w300/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg"
  },
  {
    title: "The Dark Knight",
    year: 2008,
    genre: ["Hành động", "Tội phạm"],
    poster: "https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  },
  {
    title: "Titanic",
    year: 1997,
    genre: ["Lãng mạn", "Chính kịch"],
    poster: "https://image.tmdb.org/t/p/w300/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"
  }
];

// --- Tạo thẻ phim ---
const mainContent = document.querySelector(".main-content");

function renderMovieCards(moviesToRender) {
  mainContent.innerHTML = "";
  moviesToRender.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}" />
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p><strong>Năm:</strong> ${movie.year}</p>
        <p><strong>Thể loại:</strong> ${movie.genre.join(", ")}</p>
      </div>
    `;
    mainContent.appendChild(card);
  });
}

// --- Tạo checkbox thể loại ---
const genreContainer = document.getElementById("genre-filters");

function generateGenreFilters() {
  const genres = new Set();
  movies.forEach(movie => {
    movie.genre.forEach(g => genres.add(g));
  });

  [...genres].sort().forEach(genre => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="checkbox" value="${genre}" class="genre-checkbox" />
      ${genre}
    `;
    genreContainer.appendChild(label);
  });
}

// --- Hàm lọc phim theo thể loại và tìm kiếm ---
function filterMovies() {
  const selectedGenres = [...document.querySelectorAll(".genre-checkbox:checked")].map(cb => cb.value);
  const searchTerm = document.getElementById("search-input").value.toLowerCase().trim();

  const filtered = movies.filter(movie => {
    const matchesGenre = selectedGenres.length === 0 || movie.genre.some(g => selectedGenres.includes(g));
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm);
    return matchesGenre && matchesSearch;
  });

  renderMovieCards(filtered);
}

// --- Debounce: tránh lọc quá nhiều lần khi đang gõ ---
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// --- Khởi tạo khi tải trang ---
document.addEventListener("DOMContentLoaded", () => {
  generateGenreFilters();
  renderMovieCards(movies);

  const searchInput = document.getElementById("search-input");
  const debouncedFilter = debounce(filterMovies, 400);
  searchInput.addEventListener("input", debouncedFilter);

  document.querySelectorAll(".genre-checkbox").forEach(cb => {
    cb.addEventListener("change", filterMovies);
  });
});
