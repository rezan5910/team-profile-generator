const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs/promises");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const Employee = require("./lib/Employee.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const team = [];
promptManager()
async function promptManager() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      message: "Enter the team managers name:",
      name: "name",
    },
    {
      type: "input",
      message: "Enter the team manags employee ID:",
      name: "id",
    },
    {
      type: "input",
      message: "Enter the team manags email address:",
      name: "email",
    },
    {
      type: "input",
      message: "Enter the team manags office number:",
      name: "officeNumber",
    },
  ]);
  const manager = new Manager(
    answers.name,
    answers.id,
    answers.email,
    answers.officeNumber
  );
  team.push(manager);
  promptMenu()
}

async function promptEngineer() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      message: "Enter the enginees name:",
      name: "name",
    },
    {
      type: "input",
      message: "Enter the enginees employee ID:",
      name: "id",
    },
    {
      type: "input",
      message: "Enter the enginees email address:",
      name: "email",
    },
    {
      type: "input",
      message: "Enter the enginees GitHub username:",
      name: "github",
    },
  ]);
  const engineer = new Engineer(
    answers.name,
    answers.id,
    answers.email,
    answers.github
  );
  team.push(engineer);
}

async function promptIntern() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      message: "Enter the interns name:",
      name: "name",
    },
    {
      type: "input",
      message: "Enter the interns employee ID:",
      name: "id",
    },
    {
      type: "input",
      message: "Enter the interns email address:",
      name: "email",
    },
    {
      type: "input",
      message: "Enter the interns school:",
      name: "school",
    },
  ]);
  const intern = new Intern(
    answers.name,
    answers.id,
    answers.email,
    answers.school
  );
  team.push(intern);
  // promptMenu()
}

async function promptMenu() {
  const { option } = await inquirer.prompt({
    type: 'list',
    name: 'option',
    message: 'Select an option:',
    choices: ['Add an engineer', 'Add an intern', 'Finish building the team']
  });

  switch (option) {
    case 'Add an engineer':
      await promptEngineer();
      await promptMenu();
      break;
    case 'Add an intern':
      await promptIntern();
      await promptMenu();
      break;
    case 'Finish building the team':
      const html = render(team);
      await fs.writeFile(outputPath, html);
      break;
    default:
      console.log('Invalid option');
      break;
  }
}
