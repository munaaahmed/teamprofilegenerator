const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const teamMember = [];
function app() {
    function getManger() {
        inquirer.prompt([
            {
                type: "input",
                name: "mangerName",
                message: "What is yor Manger's name"
            },
            {
                type: "input",
                name: "mangerId",
                message: "What is yor Id? "
            },
            {
                type: "input",
                name: "mangerEmail",
                message: "What is your Email?"
            },
            {
                type: "input",
                name: "officeNumber",
                message: "Officenumber for manager?"
            }
        ]).then(response => {
            const manager = new Manager(response.mangerName, response.mangerId, response.mangerEmail, response.officeNumber);
            teamMember.push(manager);
            // id.push(response.mangerId);
            addingNewMember();
        })
    }
    function getEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is engineer's name"
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is your Id? "
            },
            {
                type: "input",
                name: "mangerEmail",
                message: "What is your Email?"
            },
            {
                type: "input",
                name: "github",
                message: "Github Username?"
            }
        ]).then(response => {
            const engineer = new Engineer(response.engineerName, response.mangerEmail, response.engineerId, response.github);
            teamMember.push(engineer);
            // id.push(response.engineerId);
            addingNewMember();
        })
    }
    function getIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is yor intern's name"
            },
            {
                type: "input",
                name: "internId",
                message: "What is your Id? "
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your Email?"
            },
            {
                type: "input",
                name: "school",
                message: "school??"
            }
        ]).then(response => {
            const intern = new Intern(response.internName, response.internId, response.internEmail, response.school);
            teamMember.push(intern);
            // id.push(response.internId);
            addingNewMember();
        })
    }
    function addingNewMember() {
        inquirer.prompt([
            {
                type: "checkbox",
                name: "selectemployees",
                message: "which employee?",
                choices: [
                    "engineer",
                    "intern",
                    "manager",
                    "done"
                ]
            }
        ]).then(response => {
            const role = response.selectemployees;
            if (role == "manager") {
                getManger();
            } else if (role == "engineer") {
                getEngineer();
            } else if (role == "intern") {
                getIntern();
            } else if (role == "done") {
                renderTeam();
            }
        });
    }
    addingNewMember()
}
function renderTeam () {
    fs.writeFileSync(outputPath, render(teamMember), "utf-8");
}
app();