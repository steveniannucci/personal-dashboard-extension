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
if (storedTextColor === null) {
    localStorage.setItem("text-color", currentTextColor);
} else {
    const elements = document.querySelectorAll(".subject-to-recolor");
    for (let element of elements) {
        element.style.color = storedTextColor;
    }
}
const storedOutlineColor = localStorage.getItem("outline-color")
if (storedOutlineColor === null) {
    localStorage.setItem("outline-color", currentOutlineColor);
} else {
    const elements = document.querySelectorAll(".subject-to-recolor");
    for (let element of elements) {
        element.style.textShadow = `1px 1px 0 ${storedOutlineColor}`
    }
}
const storedMovieNumber = localStorage.getItem("locked-movie-number");
const storedBackdropNumber = localStorage.getItem("locked-backdrop-number");
const storedDisplayTaglineCheckedValue = localStorage.getItem("display-tagline");
const allowMatureRatedContent = localStorage.getItem("allow-mature-rated-content");
const allowPG13RatedContent = localStorage.getItem("allow-pg-13-rated-content");
const allowNotRatedContent = localStorage.getItem("allow-not-rated-content");
const allowHorrorGenreContent = localStorage.getItem("allow-horror-genre-content");
const allowRomanceGenreContent = localStorage.getItem("allow-romance-genre-content");
const allowThrillerGenreContent = localStorage.getItem("allow-thriller-genre-content");
const allowSpoilerContent = localStorage.getItem("allow-spoiler-content");
const storedGoals = localStorage.getItem("goals");
const storedRandomizeGoalsCheckedValue = localStorage.getItem("randomize-goals");

if (storedRandomizeGoalsCheckedValue === null) {
    localStorage.setItem("randomize-goals", true);
}

const storedGoalsData = JSON.parse(storedGoals);
if (storedGoalsData !== null && storedGoalsData.length !== 0) {
    const goals = [];
    for (let goal of storedGoalsData) {
        goals.push(goal);
    }
    if (storedRandomizeGoalsCheckedValue === "false") {
        document.querySelector("#goal").textContent = `🎯${goals[0]}`
    } else {
        const randomGoal = Math.floor(Math.random() * goals.length);
        document.querySelector("#goal").textContent = `🎯${goals[randomGoal]}`
    }
} else {
    document.querySelector("#goal").textContent = `🎯Add a new goal here.`
}

if (storedDisplayTaglineCheckedValue === null) {
    localStorage.setItem("display-tagline", true);
}
if (allowMatureRatedContent === null) {
    localStorage.setItem("allow-mature-rated-content", false);
}
if (allowPG13RatedContent === null) {
    localStorage.setItem("allow-pg-13-rated-content", true);
}
if (allowNotRatedContent === null) {
    localStorage.setItem("allow-not-rated-content", true);
}
if (allowHorrorGenreContent === null) {
    localStorage.setItem("allow-horror-genre-content", false);
}
if (allowRomanceGenreContent === null) {
    localStorage.setItem("allow-romance-genre-content", true);
}
if (allowThrillerGenreContent === null) {
    localStorage.setItem("allow-thriller-genre-content", true);
}
if (allowSpoilerContent === null) {
    localStorage.setItem("allow-spoiler-content", false);
}

document.querySelector("#time").textContent = new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
function updateTime() {
    document.querySelector("#time").textContent = new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
}
setInterval(updateTime, 1000);

const currentYear = new Date().getFullYear();

let showBackdrop = true;

document.querySelector("#title").textContent = `Title: ${currentTitle}`;

fetch(`https://api.themoviedb.org/3/search/movie?api_key=64cbe67ca110f541ec519ba56ec890b2&query=${currentTitle}&include_adult=false`, { 
    method: "GET",
    header: "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGNiZTY3Y2ExMTBmNTQxZWM1MTliYTU2ZWM4OTBiMiIsIm5iZiI6MTc4NjU1MzMwNS4xOTkwMDAxLCJzdWIiOiI2YTdjYTNkOTU4ZDU5MGZmZDBhZTY4MzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KaRDaQ0tzDzj5ZrcjBmj5TZ2uA8HER25NdcZpqeeApw"
})
    .then(response => response.json())
    .then(data => {
        // console.log(data)
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

            const posterPath = data.results[randomMovieNumber].poster_path;
            const movieTitle = data.results[randomMovieNumber].title;
            const releaseYear = data.results[randomMovieNumber].release_date.slice(0, 4);
            const randomMovieNumberId = data.results[randomMovieNumber].id;

            fetch(`https://api.themoviedb.org/3/movie/${data.results[randomMovieNumber].id}?api_key=64cbe67ca110f541ec519ba56ec890b2&query=${currentTitle}&include_adult=false&append_to_response=release_dates`, { 
                method: "GET",
                header: "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGNiZTY3Y2ExMTBmNTQxZWM1MTliYTU2ZWM4OTBiMiIsIm5iZiI6MTc4NjU1MzMwNS4xOTkwMDAxLCJzdWIiOiI2YTdjYTNkOTU4ZDU5MGZmZDBhZTY4MzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KaRDaQ0tzDzj5ZrcjBmj5TZ2uA8HER25NdcZpqeeApw"
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                // console.log(data.release_dates.results);
                const releaseData = [];
                const certifications = [];
                let certificationText = "";
                for (let release_date of data.release_dates.results) {
                    if (release_date.iso_3166_1 === "US") {
                        releaseData.push(release_date);
                    }
                }
                
                if (releaseData.length !== 0) {
                    for (let certification of releaseData[0].release_dates) {
                        if (certification.certification !== "") {
                            certifications.push(certification);
                        }
                    }

                    if (certifications.length === 0) {
                        certificationText = "";
                    } else if ((certifications[0].certification === "NR" && allowNotRatedContent === "false")
                        || (certifications[0].certification === "PG-13" && allowPG13RatedContent === "false") 
                        || (certifications[0].certification === "R" && allowMatureRatedContent === "false") 
                        || (certifications[0].certification === "NC-17" && allowMatureRatedContent === "false")) {
                        certificationText = certifications[0].certification;
                    } else {
                        certificationText = "";
                    }
                }

                const genres = [];
                const nsfwGenres = [];
                for (let genre of data.genres) {
                    genres.push(genre.name);
                }
                for (let genreName of genres) {
                    if ((genreName === "Horror" && allowHorrorGenreContent === "false") 
                        || (genreName === "Romance" && allowRomanceGenreContent === "false") 
                        || (genreName === "Thriller" && allowThrillerGenreContent === "false")) {
                        nsfwGenres.push(`${genreName}`);
                        nsfwGenres.length = 1;
                     }
                }

                let contentWarning = ""
                if (nsfwGenres.length !== 0 && certificationText !== "") {
                    contentWarning = nsfwGenres + ", " + certificationText;
                } else if (nsfwGenres.length !== 0 && certificationText === "") {
                    contentWarning = nsfwGenres;
                } else if (nsfwGenres.length === 0 && certificationText !== "") {
                    contentWarning = certificationText;
                }

                if (contentWarning !== "") {
                    showBackdrop = false;
                }
                
                if (showBackdrop === false) {
                    document.querySelector("#content-warning").textContent = `Content Warning: ${contentWarning} (Blocked)`;
                }

                if (storedDisplayTaglineCheckedValue !== "false" && showBackdrop === true) {
                    if (data.tagline !== null && data.tagline !== "") {
                        document.querySelector("#tagline").textContent = `"${data.tagline}"`;
                    }
                }
            
                if (showBackdrop === true) {
                    document.querySelector("#poster-container").innerHTML = `
                        <img id="poster" src="https://image.tmdb.org/t/p/original/${posterPath}" title="${movieTitle} (${releaseYear})" alt="a poster of">
                    `
                }
                
                fetch(`https://api.themoviedb.org/3/movie/${randomMovieNumberId}/images?api_key=64cbe67ca110f541ec519ba56ec890b2`, { 
                    method: "GET",
                    header: "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGNiZTY3Y2ExMTBmNTQxZWM1MTliYTU2ZWM4OTBiMiIsIm5iZiI6MTc4NjU1MzMwNS4xOTkwMDAxLCJzdWIiOiI2YTdjYTNkOTU4ZDU5MGZmZDBhZTY4MzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KaRDaQ0tzDzj5ZrcjBmj5TZ2uA8HER25NdcZpqeeApw"
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data.backdrops)
                        let randomBackdropNumber = Math.floor(Math.random() * data.backdrops.length);
                        if (storedBackdropNumber !== null) {
                            randomBackdropNumber = storedBackdropNumber;
                            lockedBackdropIcon.textContent = "🔒"
                            lockedBackdropBtn.textContent = "Unlock backdrop";
                        }
                        if (allowSpoilerContent !== "true") {
                            randomBackdropNumber = 0;
                        }

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

                        document.querySelector("#change-backdrop-form").addEventListener("submit", (e) => {
                            e.preventDefault();
                            let searchedBackdropNumber = document.querySelector("#backdrop-number").value
                            if (searchedBackdropNumber == "00" || searchedBackdropNumber == "000" || searchedBackdropNumber >= data.backdrops.length) {
                                searchedBackdropNumber = 0;
                            }
                            localStorage.setItem("locked-backdrop-number", searchedBackdropNumber);
                            if (storedMovieNumber === null) {
                                localStorage.setItem("locked-movie-number", randomMovieNumber);
                            }
                            window.location.reload();
                        })

                        if (showBackdrop === true) {
                            document.body.style.background = `url("https://image.tmdb.org/t/p/original/${data.backdrops[randomBackdropNumber].file_path}") no-repeat center center fixed`
                            document.body.style.backgroundSize = `cover`;
                            document.querySelector("#change-backdrop-form").style.display = "flex";
                            document.querySelector("#current-backdrop-overview").style.display = "flex";
                        } else {
                            document.querySelector("#poster-container").innerHTML = `
                            <p id="poster" class="no-movie" title="This Movie Is Blocked.">This Movie Is Blocked.</p>
                            `
                        }

                        if (allowSpoilerContent !== "true") {
                            document.querySelector("#current-backdrop").textContent = `Backdrop #${randomBackdropNumber} of (${data.backdrops.length - 1} hidden)`;
                        } else {
                            document.querySelector("#current-backdrop").textContent = `Backdrop #${randomBackdropNumber} of ${data.backdrops.length - 1}`;
                        }
                    });
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
                        if (lockedBackdropIcon.textContent === "🔒") {
                            lockedBackdropIcon.textContent = "🔓"
                            lockedBackdropBtn.textContent = "Lock backdrop";
                            localStorage.removeItem("locked-backdrop-number");
                        }
                    }
            })
    } else {
        document.querySelector("#poster-container").innerHTML = `
            <p id="poster" class="no-movie" title="This Movie Doesn't Exist. (${currentYear})">This Movie Doesn't Exist.</p>
        `

        document.body.style.background = "black"
        document.body.style.backgroundSize = `cover`;
        document.querySelector("#title").textContent = `Title: ${currentTitle} (This Movie Doesn't Exist.)`;
        document.querySelector("#change-backdrop-form").style.display = "none";
        document.querySelector("#current-backdrop-overview").style.display = "none";
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