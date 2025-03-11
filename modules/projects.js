const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            projectData.forEach(element => {
                var sector = sectorData.find(ele => ele.id === element.sector_id);
                
                const projectSector = {
                    ...element,
                    sector: sector ? sector.sector_name : null
                };
                
                projects.push(projectSector);
            });
            resolve();
        } catch (error) {
            reject("Error initializing projects: " + error.message);
        }
    });
}

function getAllProjects() {
    return new Promise((resolve, reject) => {
        if (projects.length > 0) {
            resolve(projects);
        } else {
            reject("No projects found.");
        }
    });
}

function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        const project = projects.find(ele => projectId === ele.id);
        if (project) {
            resolve(project);
        } else {
            reject("Unable to find requested project.");
        }
    });
}

function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        const filteredProjects = projects.filter(ele => ele.sector && ele.sector.toLowerCase().includes(sector.toLowerCase()));
        if (filteredProjects.length > 0) {
            resolve(filteredProjects);
        } else {
            reject("Unable to find requested projects.");
        }
    });
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };

