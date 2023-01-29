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
      message: "Please select a category of what you would like View/Add/Edit:",
      type: "list",
      name: "secondAction",
      choices: [
        { name: "Departments", value: "departments" },
        { name: "Roles", value: "roles" },
        { name: "Employees", value: "employees" },
      ],
    },
  ];

  // Add Department Inquirer

  // Actions
  const mainActionSwitch = async ({ firstAction, secondAction }) => {
    switch (firstAction) {
      case "view":
        switch (secondAction) {
          case "departments":
            await queryAndShow("./db/queries/departmentsSelect.sql").then(console.table);
            init();
            break;
          case "roles":
            await queryAndShow("./db/queries/rolesSelect.sql").then(console.table);
            init();
            break;
          case "employees":
            await queryAndShow("./db/queries/employeesSelect.sql").then(console.table);
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

  // Query database
  const queryAndShow = async (tableName) => {
    const [rows, fields] = await db.execute(fs.readFileSync(tableName, { encoding: "utf8" }));
    return rows;
  };

  // Function call to initialize app
  init();
}

main();
