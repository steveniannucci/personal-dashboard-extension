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
const storedNsfwContent3CheckedValue = localStorage.getItem("allow-not-rated-content")
if (storedNsfwContent3CheckedValue !== "false") {
    document.querySelector("#allow-not-rated-content").checked = true;
}
const storedNsfwContent4CheckedValue = localStorage.getItem("allow-horror-genre-content")
if (storedNsfwContent4CheckedValue !== "false") {
    document.querySelector("#allow-horror-genre-content").checked = true;
}
const storedNsfwContent5CheckedValue = localStorage.getItem("allow-romance-genre-content")
if (storedNsfwContent5CheckedValue !== "false") {
    document.querySelector("#allow-romance-genre-content").checked = true;
}
const storedNsfwContent6CheckedValue = localStorage.getItem("allow-thriller-genre-content")
if (storedNsfwContent6CheckedValue !== "false") {
    document.querySelector("#allow-thriller-genre-content").checked = true;
}
const storedSpoilerContentCheckedValue = localStorage.getItem("allow-spoiler-content")
if (storedSpoilerContentCheckedValue !== "false") {
    document.querySelector("#allow-spoiler-content").checked = true;
}
// goals
const storedRandomizeGoalsCheckedValue = localStorage.getItem("randomize-goals")
if (storedRandomizeGoalsCheckedValue !== "false") {
    document.querySelector("#randomize-goals").checked = true;
}
const storedGoals = localStorage.getItem("goals");
if (storedGoals !== null && storedGoals.length !== 0) {
    const storedGoalsData = JSON.parse(storedGoals);
    if (typeof storedGoalsData[0] !== "undefined") {
        document.querySelector("#goal-1").value = storedGoalsData[0];
    }
    if (typeof storedGoalsData[1] !== "undefined") {
        document.querySelector("#goal-2").value = storedGoalsData[1];
    }
    if (typeof storedGoalsData[2] !== "undefined") {
        document.querySelector("#goal-3").value = storedGoalsData[2];
    }
    if (typeof storedGoalsData[3] !== "undefined") {
        document.querySelector("#goal-4").value = storedGoalsData[3];
    }
    if (typeof storedGoalsData[4] !== "undefined") {
        document.querySelector("#goal-5").value = storedGoalsData[4];
    }
}

document.querySelector("#text-color").value = storedTextColor;
document.querySelector("#preview").style.color = storedTextColor;
document.querySelector("#outline-color").value = storedOutlineColor;
document.querySelector("#preview").style.textShadow = `1px 1px 0 ${storedOutlineColor}`;

document.querySelector("#preview").textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

document.querySelector("#settings-form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (document.querySelector("#saved-changes-text").style.visibility === "visible") {
        document.querySelector("#saved-changes-text").style.visibility = "hidden";
    }
    setTimeout(() => { document.querySelector("#saved-changes-text").style.visibility = "visible" }, 500);
    // colors
    const selectedTextColor = document.querySelector("#text-color").value;
    localStorage.setItem("text-color", selectedTextColor);
    const selectedOutlineColor = document.querySelector("#outline-color").value;
    localStorage.setItem("outline-color", selectedOutlineColor);
    // tagline
    const displayTagline = document.querySelector("#display-tagline").checked;
    localStorage.setItem("display-tagline", displayTagline);
    // nsfw
    const nsfwContent1 = document.querySelector("#allow-mature-rated-content").checked;
    localStorage.setItem("allow-mature-rated-content", nsfwContent1);
    const nsfwContent2 = document.querySelector("#allow-pg-13-rated-content").checked;
    localStorage.setItem("allow-pg-13-rated-content", nsfwContent2);
    const nsfwContent3 = document.querySelector("#allow-not-rated-content").checked;
    localStorage.setItem("allow-not-rated-content", nsfwContent3);
    const nsfwContent4 = document.querySelector("#allow-horror-genre-content").checked;
    localStorage.setItem("allow-horror-genre-content", nsfwContent4);
    const nsfwContent5 = document.querySelector("#allow-romance-genre-content").checked;
    localStorage.setItem("allow-romance-genre-content", nsfwContent5);
    const nsfwContent6 = document.querySelector("#allow-thriller-genre-content").checked;
    localStorage.setItem("allow-thriller-genre-content", nsfwContent6);
    const spoilerContent = document.querySelector("#allow-spoiler-content").checked;
    localStorage.setItem("allow-spoiler-content", spoilerContent);
    // goals
    const goals = [];
    const randomizeGoals = document.querySelector("#randomize-goals").checked;
    localStorage.setItem("randomize-goals", randomizeGoals);
    const goal1 = document.querySelector("#goal-1").value
    if (goal1 !== "") {
        goals.push(goal1);
    }
    const goal2 = document.querySelector("#goal-2").value
    if (goal2 !== "") {
        goals.push(goal2);
    }
    const goal3 = document.querySelector("#goal-3").value
    if (goal3 !== "") {
        goals.push(goal3);
    }
    const goal4 = document.querySelector("#goal-4").value
    if (goal4 !== "") {
        goals.push(goal4);
    }
    const goal5 = document.querySelector("#goal-5").value
    if (goal5 !== "") {
        goals.push(goal5);
    }
    localStorage.setItem("goals", JSON.stringify(goals));
})

document.querySelector("#text-color").addEventListener("input", () => {
    let selectedTextColor = document.querySelector("#text-color").value;
    document.querySelector("#preview").style.color = selectedTextColor;
})
document.querySelector("#outline-color").addEventListener("input", () => {
    let selectedOutlineColor = document.querySelector("#outline-color").value;
    document.querySelector("#preview").style.textShadow = `1px 1px 0 ${selectedOutlineColor}`;
})

document.querySelector("#restore-default-colors-btn").addEventListener("click", () => {
    document.querySelector("#text-color").value = "#FFFFFF";
    document.querySelector("#outline-color").value = "#000000";
    document.querySelector("#preview").style.color = "#FFFFFF";
    document.querySelector("#preview").style.textShadow = "1px 1px 0 #000000";
})

document.querySelector("#clear-goal-1-btn").addEventListener("click", () => {
    document.querySelector("#goal-1").value = "";
})
document.querySelector("#clear-goal-2-btn").addEventListener("click", () => {
    document.querySelector("#goal-2").value = "";
})
document.querySelector("#clear-goal-3-btn").addEventListener("click", () => {
    document.querySelector("#goal-3").value = "";
})
document.querySelector("#clear-goal-4-btn").addEventListener("click", () => {
    document.querySelector("#goal-4").value = "";
})
document.querySelector("#clear-goal-5-btn").addEventListener("click", () => {
    document.querySelector("#goal-5").value = "";
})