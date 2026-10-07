/* =========================
   RISVA AI
   Creative Engine
========================= */


/* LOGO UPLOAD */

const logoUpload = document.getElementById("logoUpload");
const logoPreview = document.getElementById("logoPreview");
const logoPlus = document.getElementById("logoPlus");

logoUpload.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        logoPreview.src = event.target.result;

        logoPreview.style.display = "block";

        logoPlus.style.display = "none";

        localStorage.setItem(
            "risvaLogo",
            event.target.result
        );

    };

    reader.readAsDataURL(file);

});


/* LOAD LOGO */

const savedLogo = localStorage.getItem("risvaLogo");

if (savedLogo) {

    logoPreview.src = savedLogo;

    logoPreview.style.display = "block";

    logoPlus.style.display = "none";

}


/* FOUNDER IMAGE */

const founderUpload =
    document.getElementById("founderUpload");

const founderPreview =
    document.getElementById("founderPreview");

const founderPlus =
    document.getElementById("founderPlus");


founderUpload.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        founderPreview.src =
            event.target.result;

        founderPreview.style.display =
            "block";

        founderPlus.style.display =
            "none";

        localStorage.setItem(
            "risvaFounder",
            event.target.result
        );

    };

    reader.readAsDataURL(file);

});


/* LOAD FOUNDER */

const savedFounder =
    localStorage.getItem("risvaFounder");

if (savedFounder) {

    founderPreview.src =
        savedFounder;

    founderPreview.style.display =
        "block";

    founderPlus.style.display =
        "none";

}


/* =========================
   CREATIVE ENGINE
========================= */

const challengeText =
    document.getElementById("challengeText");


const creativePrompts = {

    scene: [

        "A person enters an empty theatre at midnight. What do they see?",

        "A train stops at a station where nobody is waiting.",

        "Someone receives a letter written by their future self.",

        "A small grocery shop becomes the most important place in someone's life.",

        "Two strangers meet every day without knowing each other."

    ],


    character: [

        "Create a character who hides one important truth from everyone.",

        "Imagine a person who laughs whenever they are scared.",

        "Create someone whose biggest weakness is also their greatest talent.",

        "Imagine a character who wants to leave home but cannot.",

        "Create a person who remembers things that never happened."

    ],


    emotion: [

        "Take a happy scene and imagine it from a sad person's point of view.",

        "Turn an ordinary conversation into an emotional goodbye.",

        "Imagine a character discovering that their dream is closer than they thought.",

        "Take a funny situation and slowly change its emotional meaning.",

        "Imagine someone smiling while receiving heartbreaking news."

    ],


    visual: [

        "Imagine a single wide shot that tells an entire story.",

        "Create a scene using only shadows and reflections.",

        "Imagine a character standing alone under one street light.",

        "Tell a character's life story using objects instead of dialogue.",

        "Imagine a room where every object has a hidden meaning."

    ]

};


/* RANDOM PROMPT */

function showPrompt(type) {

    const list =
        creativePrompts[type];

    const random =
        Math.floor(
            Math.random() * list.length
        );

    challengeText.textContent =
        list[random];

}


/* FILM TOOL BUTTONS */

const toolButtons =
    document.querySelectorAll(".tool-button");

toolButtons.forEach(button => {

    button.addEventListener("click", function () {

        const tool =
            this.dataset.tool;

        showPrompt(tool);

        document
            .querySelector(".challenge-box")
            .scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

    });

});


/* NEW POSSIBILITY */

document
    .getElementById("newChallenge")
    .addEventListener("click", function () {

        const types =
            Object.keys(creativePrompts);

        const randomType =
            types[
                Math.floor(
                    Math.random() *
                    types.length
                )
            ];

        showPrompt(randomType);

    });


/* =========================
   CREATIVE MODE CARDS
========================= */

const creativeCards =
    document.querySelectorAll(".creative-card");

const ideaInput =
    document.getElementById("ideaInput");


creativeCards.forEach(card => {

    card.addEventListener("click", function () {

        const mode =
            this.dataset.mode;

        const messages = {

            film:
                "Write a scene you can see clearly in your mind...",

            story:
                "Write one character and one problem...",

            lyrics:
                "Write one emotion in your own words...",

            design:
                "Describe the visual mood you imagine..."

        };

        ideaInput.placeholder =
            messages[mode];

        document
            .querySelector(".idea-section")
            .scrollIntoView({
                behavior: "smooth"
            });

        ideaInput.focus();

    });

});


/* =========================
   IDEA STORAGE
========================= */

const saveIdea =
    document.getElementById("saveIdea");

const ideaCount =
    document.getElementById("ideaCount");


function loadIdeas() {

    const ideas =
        JSON.parse(
            localStorage.getItem(
                "risvaIdeas"
            )
        ) || [];

    ideaCount.textContent =
        ideas.length;

}


saveIdea.addEventListener("click", function () {

    const text =
        ideaInput.value.trim();

    if (!text) {

        alert(
            "First write your creative thought."
        );

        return;

    }


    const ideas =
        JSON.parse(
            localStorage.getItem(
                "risvaIdeas"
            )
        ) || [];


    ideas.push({

        text: text,

        date:
            new Date().toLocaleString()

    });


    localStorage.setItem(
        "risvaIdeas",
        JSON.stringify(ideas)
    );


    ideaInput.value = "";

    loadIdeas();


    saveIdea.textContent =
        "SAVED ✓";


    setTimeout(() => {

        saveIdea.textContent =
            "SAVE MY IDEA →";

    }, 1800);

});


loadIdeas();


/* =========================
   MOUSE 3D EFFECT
========================= */

const cards =
    document.querySelectorAll(
        ".creative-card, .quote-card, .tool-button"
    );


cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        function (event) {

            const rect =
                this.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) /
                    centerY) * -5;

            const rotateY =
                ((x - centerX) /
                    centerX) * 5;


            this.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        function () {

            this.style.transform =
                "";

        }
    );

});


/* =========================
   PAGE INTRO
========================= */

window.addEventListener(
    "load",
    function () {

        document.body.classList.add(
            "loaded"
        );

    }
);