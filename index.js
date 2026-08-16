let currentTitle = "Spider-Man"
let currentTextColor = "#FFFFFF";
let currentOutlineColor = "#000000";

const lockedMovieIcon = document.querySelector("#lock-movie-icon");
const lockedMovieBtn = document.querySelector("#lock-movie-btn");

const lockedBackdropIcon = document.querySelector("#lock-backdrop-icon");
const lockedBackdropBtn = document.querySelector("#lock-backdrop-btn");

const storedTitle = localStorage.getItem("current-title")
if (storedTitle !== null) {
    currentTitle = storedTitle;
}
const storedTextColor = localStorage.getItem("text-color")
if (storedTextColor !== null) {
    document.body.style.color = storedTextColor;
}
const storedOutlineColor = localStorage.getItem("outline-color")
if (storedOutlineColor !== null) {
    document.body.style.textShadow = `1px 1px 0 ${storedOutlineColor}`
}
const storedMovieNumber = localStorage.getItem("locked-movie-number");
const storedBackdropNumber = localStorage.getItem("locked-backdrop-number");
const storedDisplayTaglineCheckedValue = localStorage.getItem("display-tagline");

document.querySelector("#time").textContent = new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
function updateTime() {
    document.querySelector("#time").textContent = new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
}
setInterval(updateTime, 1000);

const currentYear = new Date().getFullYear();
// const quote = document.querySelector("#quote").textContent = "\"With great power comes great responsibility.\""

// const quotes = ["With great power comes great responsibility.", "Be the change you want to see in the world.", "How did we get here?", "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.", "Did you... ever do something that you regret?"]
// const randomQuote = Math.floor(Math.random() * quotes.length);
// document.querySelector("#quote").textContent = `"${quotes[randomQuote]}"`

document.querySelector("#title").textContent = `Title: ${currentTitle}`;

fetch(`https://api.themoviedb.org/3/search/movie?api_key=64cbe67ca110f541ec519ba56ec890b2&query=${currentTitle}&include_adult=false`, { 
    method: "GET",
    header: "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGNiZTY3Y2ExMTBmNTQxZWM1MTliYTU2ZWM4OTBiMiIsIm5iZiI6MTc4NjU1MzMwNS4xOTkwMDAxLCJzdWIiOiI2YTdjYTNkOTU4ZDU5MGZmZDBhZTY4MzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KaRDaQ0tzDzj5ZrcjBmj5TZ2uA8HER25NdcZpqeeApw"
})
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.results.length !== 0) {
            let randomMovieNumber = Math.floor(Math.random() * data.results.length);
            if (storedMovieNumber === null) {
                    if (data.results[randomMovieNumber].backdrop_path === null || data.results[randomMovieNumber].poster_path === null) {
                    if (data.results[0].backdrop_path !== null || data.results[randomMovieNumber].backdrop_path !== null) {
                        randomMovieNumber = 0;
                    } else if (data.results[1].backdrop_path !== null || data.results[randomMovieNumber].poster_path !== null) {
                        randomMovieNumber = 1;
                    } else {
                        randomMovieNumber = 2;
                    }
                }
            } else {
                randomMovieNumber = storedMovieNumber;
                lockedMovieIcon.textContent = "🔒"
                lockedMovieBtn.textContent = "Unlock movie";
            }
            
            fetch(`https://api.themoviedb.org/3/movie/${data.results[randomMovieNumber].id}/images?api_key=64cbe67ca110f541ec519ba56ec890b2`, { 
                method: "GET",
                header: "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGNiZTY3Y2ExMTBmNTQxZWM1MTliYTU2ZWM4OTBiMiIsIm5iZiI6MTc4NjU1MzMwNS4xOTkwMDAxLCJzdWIiOiI2YTdjYTNkOTU4ZDU5MGZmZDBhZTY4MzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KaRDaQ0tzDzj5ZrcjBmj5TZ2uA8HER25NdcZpqeeApw"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data.backdrops)
                    let randomBackdropNumber = Math.floor(Math.random() * 100);
                    if (data.backdrops.length < 100) {
                        randomBackdropNumber = Math.floor(Math.random() * data.backdrops.length)
                    }
                    if (storedBackdropNumber === null) {
                        document.body.style.background = `url("https://image.tmdb.org/t/p/original/${data.backdrops[randomBackdropNumber].file_path}") no-repeat center center fixed`
                        document.body.style.backgroundSize = `cover`;
                    } else if (storedBackdropNumber !== null) {
                        randomBackdropNumber = storedBackdropNumber;
                        lockedBackdropIcon.textContent = "🔒"
                        lockedBackdropBtn.textContent = "Unlock backdrop";
                        document.body.style.background = `url("https://image.tmdb.org/t/p/original/${data.backdrops[randomBackdropNumber].file_path}") no-repeat center center fixed`
                        document.body.style.backgroundSize = `cover`;
                    }

                    console.log(randomBackdropNumber);
                    lockedBackdropBtn.addEventListener("click", (e) => {
                        e.preventDefault();
                        if (lockedBackdropIcon.textContent === "🔓") {
                            lockedBackdropIcon.textContent = "🔒"
                            lockedBackdropBtn.textContent = "Unlock backdrop";
                            localStorage.setItem("locked-backdrop-number", randomBackdropNumber);
                            if (lockedMovieIcon.textContent === "🔓") {
                                lockedMovieIcon.textContent = "🔒"
                                lockedMovieBtn.textContent = "Unlock movie";
                                localStorage.setItem("locked-movie-number", randomMovieNumber);
                            }
                        } else {
                            lockedBackdropIcon.textContent = "🔓"
                            lockedBackdropBtn.textContent = "Lock backdrop";
                            localStorage.removeItem("locked-backdrop-number");
                        }
                    })

                    document.querySelector("#current-backdrop").textContent = `Backdrop #${randomBackdropNumber} of ${data.backdrops.length}`
                });

            document.querySelector("#poster-container").innerHTML = `
                <img id="poster" src="https://image.tmdb.org/t/p/original/${data.results[randomMovieNumber].poster_path}" title="${data.results[randomMovieNumber].title} (${data.results[randomMovieNumber].release_date.slice(0, 4)})">
            `
            
            if (storedDisplayTaglineCheckedValue !== null && storedDisplayTaglineCheckedValue !== false) {
                fetch(`https://api.themoviedb.org/3/movie/${data.results[randomMovieNumber].id}?api_key=64cbe67ca110f541ec519ba56ec890b2&query=${currentTitle}&include_adult=false`, { 
                method: "GET",
                header: "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGNiZTY3Y2ExMTBmNTQxZWM1MTliYTU2ZWM4OTBiMiIsIm5iZiI6MTc4NjU1MzMwNS4xOTkwMDAxLCJzdWIiOiI2YTdjYTNkOTU4ZDU5MGZmZDBhZTY4MzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KaRDaQ0tzDzj5ZrcjBmj5TZ2uA8HER25NdcZpqeeApw"
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.tagline !== null && data.tagline !== "") {
                        document.querySelector("#tagline").textContent = `"${data.tagline}"`;
                    }
                })
            }
            document.querySelector("#change-backdrop-form").addEventListener("submit", (e) => {
                e.preventDefault();
                let searchedBackdropNumber = document.querySelector("#backdrop-number").value
                localStorage.setItem("locked-backdrop-number", searchedBackdropNumber);
                if (storedMovieNumber === null) {
                    localStorage.setItem("locked-movie-number", randomMovieNumber);
                }
                window.location.reload();
            })

            lockedMovieBtn.addEventListener("click", (e) => {
                e.preventDefault();
                if (lockedMovieIcon.textContent === "🔓") {
                    lockedMovieIcon.textContent = "🔒"
                    lockedMovieBtn.textContent = "Unlock movie";
                    localStorage.setItem("locked-movie-number", randomMovieNumber);
                } else {
                    lockedMovieIcon.textContent = "🔓"
                    lockedMovieBtn.textContent = "Lock movie";
                    localStorage.removeItem("locked-movie-number");
                }
            })
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
    if (localStorage.getItem("locked-movie-number") !== null) {
        localStorage.removeItem("locked-movie-number");
    }
    if (localStorage.getItem("locked-backdrop-number") !== null) {
        localStorage.removeItem("locked-backdrop-number");
    }
    window.location.reload();
})