const objects = [
    "Umbrella",
    "Camera",
    "Book",
    "Clock",
    "Mirror",
    "Key",
    "Bottle",
    "Phone"
];

const places = [
    "Railway Station",
    "College",
    "Beach",
    "Forest",
    "Library",
    "Bus Stop",
    "Rooftop",
    "Old House"
];

const emotions = [
    "Happiness",
    "Fear",
    "Love",
    "Curiosity",
    "Anger",
    "Hope",
    "Loneliness",
    "Surprise"
];

function randomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function generateChallenge() {

    document.getElementById("object").textContent =
        randomItem(objects);

    document.getElementById("place").textContent =
        randomItem(places);

    document.getElementById("emotion").textContent =
        randomItem(emotions);
}

function startChallenge() {

    document.getElementById("challenge").scrollIntoView({
        behavior: "smooth"
    });

    generateChallenge();
}

function saveIdea() {

    const input = document.getElementById("ideaInput");

    const idea = input.value.trim();

    if (idea === "") {
        alert("First write your creative idea!");
        return;
    }

    const savedIdeas =
        JSON.parse(localStorage.getItem("risvaIdeas")) || [];

    savedIdeas.push(idea);

    localStorage.setItem(
        "risvaIdeas",
        JSON.stringify(savedIdeas)
    );

    input.value = "";

    displayIdeas();
}

function displayIdeas() {

    const container =
        document.getElementById("savedIdeas");

    const savedIdeas =
        JSON.parse(localStorage.getItem("risvaIdeas")) || [];

    container.innerHTML = "";

    savedIdeas.forEach((idea, index) => {

        const card =
            document.createElement("div");

        card.className = "idea-card";

        card.innerHTML = `
            <strong>Idea ${index + 1}</strong>
            <p>${idea}</p>
        `;

        container.appendChild(card);
    });
}

displayIdeas();