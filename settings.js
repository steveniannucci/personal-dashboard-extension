// color
const storedTextColor = localStorage.getItem("text-color");
const storedOutlineColor = localStorage.getItem("outline-color");
// tagline
const storedDisplayTaglineCheckedValue = localStorage.getItem("display-tagline")
if (storedDisplayTaglineCheckedValue !== "false") {
    document.querySelector("#display-tagline").checked = true;
}
// nsfw
const storedNsfwContent1CheckedValue = localStorage.getItem("allow-mature-rated-content")
if (storedNsfwContent1CheckedValue !== "false") {
    document.querySelector("#allow-mature-rated-content").checked = true;
}
const storedNsfwContent2CheckedValue = localStorage.getItem("allow-pg-13-rated-content")
if (storedNsfwContent2CheckedValue !== "false") {
    document.querySelector("#allow-pg-13-rated-content").checked = true;
}
const storedNsfwContent3CheckedValue = localStorage.getItem("allow-horror-genre-content")
if (storedNsfwContent3CheckedValue !== "false") {
    document.querySelector("#allow-horror-genre-content").checked = true;
}
const storedNsfwContent4CheckedValue = localStorage.getItem("allow-romance-genre-content")
if (storedNsfwContent4CheckedValue !== "false") {
    document.querySelector("#allow-romance-genre-content").checked = true;
}
const storedNsfwContent5CheckedValue = localStorage.getItem("allow-thriller-genre-content")
if (storedNsfwContent5CheckedValue !== "false") {
    document.querySelector("#allow-thriller-genre-content").checked = true;
}

document.querySelector("#text-color").value = storedTextColor;
document.querySelector("#preview").style.color = storedTextColor;
document.querySelector("#outline-color").value = storedOutlineColor;
document.querySelector("#preview").style.textShadow = `1px 1px 0 ${storedOutlineColor}`;

document.querySelector("#preview").textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

document.querySelector("#settings-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Your changes have been saved.")
    // colors
    let selectedTextColor = document.querySelector("#text-color").value;
    localStorage.setItem("text-color", selectedTextColor);
    let selectedOutlineColor = document.querySelector("#outline-color").value;
    localStorage.setItem("outline-color", selectedOutlineColor);
    // tagline
    let displayTagline = document.querySelector("#display-tagline").checked;
    localStorage.setItem("display-tagline", displayTagline);
    // nsfw
    let nsfwContent1 = document.querySelector("#allow-mature-rated-content").checked;
    localStorage.setItem("allow-mature-rated-content", nsfwContent1);
    let nsfwContent2 = document.querySelector("#allow-pg-13-rated-content").checked;
    localStorage.setItem("allow-pg-13-rated-content", nsfwContent2);
    let nsfwContent3 = document.querySelector("#allow-horror-genre-content").checked;
    localStorage.setItem("allow-horror-genre-content", nsfwContent3);
    let nsfwContent4 = document.querySelector("#allow-romance-genre-content").checked;
    localStorage.setItem("allow-romance-genre-content", nsfwContent4);
    let nsfwContent5 = document.querySelector("#allow-thriller-genre-content").checked;
    localStorage.setItem("allow-thriller-genre-content", nsfwContent5);
})

document.querySelector("#text-color").addEventListener("input", () => {
    let selectedTextColor = document.querySelector("#text-color").value;
    document.querySelector("#preview").style.color = selectedTextColor;
})
document.querySelector("#outline-color").addEventListener("input", () => {
    let selectedOutlineColor = document.querySelector("#outline-color").value;
    document.querySelector("#preview").style.textShadow = `1px 1px 0 ${selectedOutlineColor}`;
})