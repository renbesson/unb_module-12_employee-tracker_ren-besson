async function main() {
  // Adds the required packages to the app
  const inquirer = require("inquirer");
  const fs = require("fs");
  const mysql = require("mysql2/promise");
  const conTable = require("console.table");

  console.clear();

  // Bundled questions
  const mainQuestion = [
    {
      message: "Please select an action you would like to perform:",
      type: "list",
      name: "firstAction",
      choices: [
        { name: "View", value: "view" },
        { name: "Add", value: "add" },
        { name: "Edit", value: "edit" },
      ],
    },
    {
      message: (answers) =>
        `Please select a category of what you would like to ${answers.firstAction}:`,
      type: "list",
      name: "secondAction",
      choices: [
        { name: "Departments", value: "departments" },
        { name: "Roles", value: "roles" },
        { name: "Employees", value: "employees" },
      ],
    },
  ];

  const addDepartmentQuestion = {
    message: "Please type the name of the new Department: ",
    type: "input",
    name: "newDepartment",
  };

  const addRoleQuestions = [
    {
      message: "Please type the name of the new Role: ",
      type: "input",
      name: "newRoleName",
    },
    {
      message: "Please type the salary for the new Role: ",
      type: "input",
      name: "newRoleSalary",
    },
    {
      message: "Please type the department ID of the new Role: ",
      type: "input",
      name: "newRoleDepartmentId",
    },
  ];

  // Actions
  const mainActionSwitch = async ({ firstAction, secondAction }) => {
    switch (firstAction) {
      // View Actions
      case "view":
        const pathView = `./db/queries/${secondAction}Query.sql`;
        const [rows] = await db.execute(fs.readFileSync(pathView, { encoding: "utf8" }));
        console.table(rows);
        init();
        break;
      // Add Actions
      case "add":
        const pathAdd = `./db/inserts/${secondAction}Insert.sql`;
        switch (secondAction) {
          case "departments":
            let { newDepartment } = await inquirer.prompt(addDepartmentQuestion).catch(console.log);
            await db.execute(fs.readFileSync(pathAdd, { encoding: "utf8" }), [newDepartment]);
            init();
            break;
          case "roles":
            let newRole = await inquirer.prompt(addRoleQuestions).catch(console.log);
            let newRoleArray = [
              newRole.newRoleName,
              newRole.newRoleSalary,
              newRole.newRoleDepartmentId,
            ];
            console.log(newRoleArray);
            /* await db.execute(fs.readFileSync(pathAdd, { encoding: "utf8" }), [
              newRoleName,
              newRoleSalary,
              newRoleDepartmentId,
            ]); */
            init();
            break;
          case "employees":
            await addAndShow("./db/queries/employeesQuery.sql").then(console.table);
            init();
            break;
        }
    }
  };

  // Initializes the app
  const init = () => {
    inquirer.prompt(mainQuestion).then(mainActionSwitch).catch(console.log);
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

  // Insert and Show
  const addAndShow = async (tableName) => {
    const [rows, fields] = await db.execute(fs.readFileSync(tableName, { encoding: "utf8" }));
    return rows;
  };

  // Function call to initialize app
  init();
}

main();
