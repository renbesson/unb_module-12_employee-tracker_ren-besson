// Adds the required packages to the app
const inquirer = require("inquirer");
const mysql = require("mysql2");
const conTable = require("console.table");

// Bundled questions
const mainQuestion = {
  message: "Please select an action you would like to perform:",
  type: "list",
  name: "mainAction",
  choices: [
    new inquirer.Separator("----- View Options -----"),
    { name: "View All Departments", value: "viewDepartments" },
    { name: "View All Roles", value: "viewRoles" },
    { name: "View All Employees", value: "viewEmployees" },
    new inquirer.Separator("----- Edit Options -----"),
    { name: "Add a Department", value: "addRole" },
    { name: "Add an Employee", value: "addEmployee" },
    { name: "Add a Role", value: "addDepartment" },
  ],
};

// Actions
const actionsSwitch = (action) => {
  switch (action) {
    case "viewDepartments":
      queryAndShow("departments");
      break;
    case "viewRoles":
      queryAndShow("roles");
      break;
    case "viewEmployees":
      queryAndShow("employees");
      break;
  }
};

// Initializes the app
const init = () => {
  console.clear();
  inquirer
    .prompt(mainQuestion)
    .then(({ mainAction }) => actionsSwitch(mainAction))
    .catch(console.log);
};

// Access the database
const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "company_db",
  },
  console.log(`Connected to database!`)
);

// Query database
/* const queryDb = new Promise((resolve, reject) => {
  db.query(`SELECT * FROM ${tableName}`, function (error, results) {
    error ? reject(error) : resolve(results);
  });
}); */

// Query database
const queryAndShow = (tableName) => {
  db.query(`SELECT * FROM ${tableName}`, function (error, results) {
    console.table(error ? error : results);
  });
};

// Function call to initialize app
init();
