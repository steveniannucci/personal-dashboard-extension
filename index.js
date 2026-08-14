let currentTitle = "Spider-Man"
const storedTitle = localStorage.getItem("current-title")
if (storedTitle !== null) {
    currentTitle = storedTitle;
}

function updateTime() {
    document.querySelector("#time").textContent = new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
}
setInterval(updateTime, 1000);

const currentYear = new Date().getFullYear();
// const quote = document.querySelector("#quote").textContent = "\"With great power comes great responsibility.\""

document.querySelector("#title").textContent = `Title: ${currentTitle}`;

fetch(`https://api.themoviedb.org/3/search/movie?api_key=64cbe67ca110f541ec519ba56ec890b2&query=${currentTitle}`, { 
    method: "GET",
    header: "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGNiZTY3Y2ExMTBmNTQxZWM1MTliYTU2ZWM4OTBiMiIsIm5iZiI6MTc4NjU1MzMwNS4xOTkwMDAxLCJzdWIiOiI2YTdjYTNkOTU4ZDU5MGZmZDBhZTY4MzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KaRDaQ0tzDzj5ZrcjBmj5TZ2uA8HER25NdcZpqeeApw" 
})
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.results.length !== 0) {
            let randomNumber = Math.floor(Math.random() * data.results.length);
            if (data.results[randomNumber].backdrop_path === null) {
                if (data.results[0].backdrop_path !== null) {
                    randomNumber = 0;
                } else if (data.results[1].backdrop_path !== null) {
                    randomNumber = 1;
                } else {
                    randomNumber = 2;
                }
            }
            document.querySelector("#poster-container").innerHTML = `
                <img id="poster" src="https://image.tmdb.org/t/p/original/${data.results[randomNumber].poster_path}" title="${data.results[randomNumber].title} (${data.results[randomNumber].release_date.slice(0, 4)})">
            `

            document.body.style.background = `url("https://image.tmdb.org/t/p/original/${data.results[randomNumber].backdrop_path}") no-repeat center center fixed`
            document.body.style.backgroundSize = `cover`;
        } else {
            document.querySelector("#poster-container").innerHTML = `
                <p id="poster" class="no-movie" title="This Movie Doesn't Exist. (${currentYear})">This Movie Doesn't Exist.</p>
            `

            document.body.style.background = "black"
            document.body.style.backgroundSize = `cover`;
            document.querySelector("#title").textContent = `Title: ${currentTitle} (This Movie Doesn't Exist.)`;
        }
    });

document.querySelector("#search-bar-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let searchedTitle = document.querySelector("#search-bar-input").value
    localStorage.setItem("current-title", searchedTitle);
    window.location.reload();
})