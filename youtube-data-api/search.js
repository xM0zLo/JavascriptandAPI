const apiKey = 'AIzaSyCSEs5tL8QiwrQPeFLiKugNAZMGEu-mRps';
const maxResults = 5;

function search() {
  const searchInput = document.getElementById('search-input').value;

  fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&maxResults=${maxResults}&q=${searchInput}`)
    .then(response => response.json())
    .then(data => {
      const searchResults = document.getElementById('search-results');
      searchResults.innerHTML = '';
      console.log(data.items);
      data.items.forEach(item => {
        const videoId = item.id.videoId;
        const videoTitle = item.snippet.title;
        const videoDescription = item.snippet.description;
        const videoElement = `
          <div class="video">
            <h2>${videoTitle}</h2>
            <p>${videoDescription}</p>
            <iframe width="256" height="144" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
          </div>
        `;

        searchResults.innerHTML += videoElement;
      });
    })
    .catch(error => {
      console.error(error);
    });
}