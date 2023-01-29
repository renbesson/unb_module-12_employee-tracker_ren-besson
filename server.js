async function main() {
  // Adds the required packages to the app
  const inquirer = require("inquirer");
  const mysql = require("mysql2/promise");
  const conTable = require("console.table");

  console.clear();

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
      new inquirer.Separator("----- Add Options -----"),
      { name: "Add a Department", value: "addRole" },
      { name: "Add an Employee", value: "addEmployee" },
      { name: "Add a Role", value: "addDepartment" },
      new inquirer.Separator("----- Edit Options -----"),
      { name: "Edit a Department", value: "editRole" },
      { name: "Edit an Employee", value: "editEmployee" },
      { name: "Edit a Role", value: "editDepartment" },
    ],
  };

  // Add Department Inquirer


  // Actions
  const actionsSwitch = async (action) => {
    switch (action) {
      case "viewDepartments":
        await queryAndShow(
          "SELECT departments.name AS Name, departments.id AS ID FROM departments;"
        ).then(console.table);
        init();
        break;
      case "viewRoles":
        await queryAndShow(`SELECT roles.title AS "Job Title", roles.id AS "Role ID", departments.name AS Department, roles.salary AS Salary
        FROM roles
        JOIN departments ON roles.department_id = departments.id;`).then(console.table);
        init();
        break;
      case "viewEmployees":
        await queryAndShow(`SELECT
        employees.id AS "Employee ID",
        employees.first_name AS "First Name",
        employees.last_name AS "Last Name",
        roles.title AS "Job Title",
        departments.name AS Department,
        roles.salary AS Salary,
        CONCAT(employees.first_name, " ", employees.last_name) AS Manager
    FROM employees
    JOIN roles ON role_id = roles.id
    JOIN departments ON roles.department_id = departments.id;`).then(console.table);
        init();
        break;
    }
  };

  // Initializes the app
  const init = () => {
    inquirer
      .prompt(mainQuestion)
      .then(({ mainAction }) => actionsSwitch(mainAction))
      .catch(console.log);
  };

  // Access the database
  const db = await mysql.createConnection(
    {
      host: "127.0.0.1",
      user: "root",
      password: "root",
      database: "company_db",
    },
    console.log(`Connected to database!`)
  );

  // Query database
  const queryAndShow = async (tableName) => {
    const [rows, fields] = await db.execute(`${tableName}`);
    return rows;
  };

  // Function call to initialize app
  init();
}

main();
