const Employee = require("./lib/Employee");
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs-extra');
const util =require('util');
const fsWriteFileAsync = util.promisify(fs.writeFile);
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');
const render = require('./lib/htmlRenderer');

let team = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```

async function init() {
    let teamProfile;
    do {
        try {
            questions = await inquirer.prompt([{
                message: "What's your Employee's name?",
                type: "input",
                name: "name"
            },
            {
                message: "What's your Employees id?",
                type: "input",
                name: "id"
            },
            {
                message: "What's your employees email?",
                type: "input",
                name: "email"
            },
            {
                message: "What role does this person have in the company?",
                type: "input",
                name: "role"
            }])

            let role;
            switch (questions.role) {
                case 'engineer':
                    role = await inquirer.prompt([{
                        message: "What is Employees github?",
                        type: "input",
                        name: "github"
                    }])
                    const engineer = new Engineer(questions.name, questions.id, questions.email, role.github)
                    team.push(engineer)
                    break;

                case 'manager':
                    role = await inquirer.prompt([{
                        message: "What is Employees office number?",
                        type: "input",
                        name: "officeNumber"
                    }])
                    const manager = new Manager(questions.name, questions.id, questions.email, role.officeNumber)
                    team.push(manager)
                    break;

                case 'intern':
                    role = await inquirer.prompt([{
                        message: "What school did the Employee go to?",
                        type: "input",
                        name: "school"
                    }])
                    const intern = new Intern(questions.name, questions.id, questions.email, role.school)
                    team.push(intern)
                    break;
            }

        } catch (error) {
            console.log(error);
        } 
        teamProfile = await inquirer.prompt([{
            message: "Would you like to add another member?",
            type: "input",
            name: "complete"
            }])
    } while (teamProfile.complete === "yes")

    fs.ensureDir(OUTPUT_DIR).then(() => {
        fsWriteFileAsync(outputPath, render(team));
    })
};



init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.

// Hint: you may need to check if the `output` folder exists and create it if it
// does not. The fs npm package may have methods to check if a directory exists, and they
// may also have methods to create a directory that doesn't...


