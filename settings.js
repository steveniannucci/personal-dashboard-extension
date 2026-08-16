let currentTextColor = "#FFFFFF";
let currentOutlineColor = "#000000";
const storedTextColor = localStorage.getItem("text-color")
if (storedTextColor !== null) {
    currentTextColor = storedTextColor;
}
const storedOutlineColor = localStorage.getItem("outline-color")
if (storedOutlineColor !== null) {
    currentOutlineColor = storedOutlineColor;
}
const storedDisplayTaglineCheckedValue = localStorage.getItem("display-tagline")
if (storedDisplayTaglineCheckedValue !== null && storedDisplayTaglineCheckedValue !== false) {
    document.querySelector("#display-tagline").checked = true;
}

document.querySelector("#text-color").value = currentTextColor;
document.querySelector("#preview").style.color = currentTextColor;
document.querySelector("#outline-color").value = currentOutlineColor;
document.querySelector("#preview").style.textShadow = `1px 1px 0 ${currentOutlineColor}`;

document.querySelector("#allow-horror").checked = "checked";

document.querySelector("#preview").textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

document.querySelector("#settings-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Your changes have been saved.")
    let selectedTextColor = document.querySelector("#text-color").value;
    localStorage.setItem("text-color", selectedTextColor);
    let selectedOutlineColor = document.querySelector("#outline-color").value;
    localStorage.setItem("outline-color", selectedOutlineColor);
    let displayTagline = document.querySelector("#display-tagline").checked;
    if (displayTagline === true) {
        localStorage.setItem("display-tagline", displayTagline);
    } else if (storedDisplayTaglineCheckedValue !== null) {
        localStorage.removeItem("display-tagline");
    }
})

document.querySelector("#text-color").addEventListener("input", () => {
    let selectedTextColor = document.querySelector("#text-color").value;
    document.querySelector("#preview").style.color = selectedTextColor;
})

document.querySelector("#outline-color").addEventListener("input", () => {
    let selectedOutlineColor = document.querySelector("#outline-color").value;
    document.querySelector("#preview").style.textShadow = `1px 1px 0 ${selectedOutlineColor}`;
})