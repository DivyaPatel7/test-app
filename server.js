/********************************************************************************
*  WEB322 – Assignment 04
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Divya Kamleshkumar Patel Student ID: 103491239 Date: 3/10/2024
*
********************************************************************************/

const projectData = require("./modules/projects");
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/solutions/projects", (req, res) => {
    const sector = req.query.sector;

    if (sector) {
        projectData.getProjectsBySector(sector)
            .then(projects => {
                if (projects.length > 0) {
                    res.render("projects", { projects });
                } else {
                    res.status(404).render("404", { message: "No projects found for the given sector." });
                }
            })
            .catch(err => res.status(404).render("404", { message: `No projects found for sector: ${sector}` }));
    } else {
        projectData.getAllProjects()
            .then(projects => {
                res.render("projects", { projects });
            })
            .catch(err => res.status(500).send("Error: " + err));
    }
});

app.get("/solutions/projects/:id", (req, res) => {
    const projectId = parseInt(req.params.id, 10); 
    projectData.getProjectById(projectId)
        .then(project => {
            if (project) {
                res.render("project",{project});
            } else {
                res.status(404).send("Project not found.");
            }
        })
        .catch(err => res.status(404).render("404", {message: "Unable to find requested project."}));
});

app.use((req, res) => {
    res.status(404).render("404", {message: "I'm sorry, we're unable to find what you're looking for"});
});

projectData.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error("Error initializing project data: " + err);
    });
