document.addEventListener("DOMContentLoaded", async () => {
    const bookmarksBar = document.querySelector("#bookmarks-bar");
    try {
        browser.bookmarks.getTree().then(bookMarkTreeNodes => {
            const root = bookMarkTreeNodes[0];
            if (root.children) {
                for (let child of root.children) {
                    for (let childEl of child.children) {
                        console.log(childEl.url);
                        bookmarksBar.innerHTML += `
                        <div class="bookmark-container">
                            <a class="bookmark-link" href="${childEl.url}">
                                <span class="bookmark-title">${childEl.title}</span>
                            </a>
                        </div>
                        `
                    }
                }
            }
        })
        // const bookmarksTree = await chrome.bookmarks.getTree();
        // const tree = browser.bookmarks.getTree;
        // for (let bookmark of tree) {
        //     document.bookmarksContainer.append(bookmark);
        //     console.log(bookmark);
        } catch(err) {
        console.log("Failed to load bookmarks:", err);
    }
})



let currentTitle = "Spider-Man"
let currentTextColor = "#FFFFFF";
let currentOutlineColor = "#000000";

const lockedIcon = document.querySelector("#lock-screen-icon");
const lockedIconBtn = document.querySelector("#lock-screen-btn");

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
const storedNumber = localStorage.getItem("locked-number");

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

fetch(`https://api.themoviedb.org/3/search/movie?api_key=64cbe67ca110f541ec519ba56ec890b2&query=${currentTitle}`, { 
    method: "GET",
    header: "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGNiZTY3Y2ExMTBmNTQxZWM1MTliYTU2ZWM4OTBiMiIsIm5iZiI6MTc4NjU1MzMwNS4xOTkwMDAxLCJzdWIiOiI2YTdjYTNkOTU4ZDU5MGZmZDBhZTY4MzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KaRDaQ0tzDzj5ZrcjBmj5TZ2uA8HER25NdcZpqeeApw" 
})
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.results.length !== 0) {
            let randomNumber = Math.floor(Math.random() * data.results.length);
            if (storedNumber === null) {
                    if (data.results[randomNumber].backdrop_path === null || data.results[randomNumber].poster_path === null) {
                    if (data.results[0].backdrop_path !== null || data.results[randomNumber].backdrop_path !== null) {
                        randomNumber = 0;
                    } else if (data.results[1].backdrop_path !== null || data.results[randomNumber].poster_path !== null) {
                        randomNumber = 1;
                    } else {
                        randomNumber = 2;
                    }
                }
            } else {
                randomNumber = storedNumber;
                lockedIcon.textContent = "🔒"
                lockedIconBtn.textContent = "Unlock screen";
            }
            document.querySelector("#poster-container").innerHTML = `
                <img id="poster" src="https://image.tmdb.org/t/p/original/${data.results[randomNumber].poster_path}" title="${data.results[randomNumber].title} (${data.results[randomNumber].release_date.slice(0, 4)})">
            `

            document.body.style.background = `url("https://image.tmdb.org/t/p/original/${data.results[randomNumber].backdrop_path}") no-repeat center center fixed`
            document.body.style.backgroundSize = `cover`;

            lockedIconBtn.addEventListener("click", (e) => {
                e.preventDefault();
                if (lockedIcon.textContent === "🔓") {
                    lockedIcon.textContent = "🔒"
                    lockedIconBtn.textContent = "Unlock screen";
                    localStorage.setItem("locked-number", randomNumber);
                } else {
                    lockedIcon.textContent = "🔓"
                    lockedIconBtn.textContent = "Lock screen";
                    localStorage.removeItem("locked-number");
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
    if (localStorage.getItem("locked-number") !== null) {
        localStorage.removeItem("locked-number")
    }
    window.location.reload();
})