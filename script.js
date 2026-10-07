/* =========================================
   RISVA AI - PROJECT SYSTEM
========================================= */

const projectList = document.getElementById("projectList");

let projects = JSON.parse(
    localStorage.getItem("RISVA_PROJECTS")
) || [];


/* =========================================
   SAVE PROJECT
========================================= */

function saveProject() {

    const title =
        document.getElementById("projectTitle").value.trim();

    const description =
        document.getElementById("projectDescription").value.trim();

    const image =
        document.getElementById("projectImage").value.trim();


    if (title === "" || description === "") {

        alert("Please enter project title and description.");

        return;
    }


    const project = {

        id: Date.now(),

        title: title,

        description: description,

        image: image

    };


    projects.push(project);

    saveToStorage();

    clearForm();

    displayProjects();

    alert("Project saved successfully!");


}


/* =========================================
   DISPLAY PROJECTS
========================================= */

function displayProjects() {

    projectList.innerHTML = "";


    if (projects.length === 0) {

        projectList.innerHTML = `
            <p class="empty-message">
                No projects yet. Create your first project.
            </p>
        `;

        return;
    }


    projects.forEach(function(project) {

        const card =
            document.createElement("div");

        card.className = "project-card";


        let imageHTML = "";

        if (project.image !== "") {

            imageHTML = `
                <img
                    src="${escapeHTML(project.image)}"
                    class="project-image"
                    alt="Project Image"
                    onerror="this.style.display='none'"
                >
            `;

        }


        card.innerHTML = `

            ${imageHTML}

            <div>

                <h3>
                    ${escapeHTML(project.title)}
                </h3>

                <p>
                    ${escapeHTML(project.description)}
                </p>

            </div>


            <div class="project-actions">

                <button
                    onclick="editProject(${project.id})"
                >
                    EDIT
                </button>


                <button
                    onclick="deleteProject(${project.id})"
                >
                    DELETE
                </button>

            </div>

        `;


        projectList.appendChild(card);

    });

}


/* =========================================
   EDIT PROJECT
========================================= */

function editProject(id) {

    const project =
        projects.find(function(item) {

            return item.id === id;

        });


    if (!project) return;


    const newTitle =
        prompt(
            "Edit Project Title:",
            project.title
        );


    if (newTitle === null) return;


    const newDescription =
        prompt(
            "Edit Project Description:",
            project.description
        );


    if (newDescription === null) return;


    const newImage =
        prompt(
            "Edit Image URL:",
            project.image
        );


    if (newImage === null) return;


    project.title =
        newTitle.trim();


    project.description =
        newDescription.trim();


    project.image =
        newImage.trim();


    saveToStorage();

    displayProjects();

}


/* =========================================
   DELETE PROJECT
========================================= */

function deleteProject(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this project?"
        );


    if (!confirmDelete) return;


    projects =
        projects.filter(function(project) {

            return project.id !== id;

        });


    saveToStorage();

    displayProjects();

}


/* =========================================
   LOCAL STORAGE
========================================= */

function saveToStorage() {

    localStorage.setItem(
        "RISVA_PROJECTS",
        JSON.stringify(projects)
    );

}


/* =========================================
   CLEAR FORM
========================================= */

function clearForm() {

    document.getElementById(
        "projectTitle"
    ).value = "";


    document.getElementById(
        "projectDescription"
    ).value = "";


    document.getElementById(
        "projectImage"
    ).value = "";

}


/* =========================================
   SECURITY
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================
   START
========================================= */

displayProjects();