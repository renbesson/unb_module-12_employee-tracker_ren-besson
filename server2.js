async function main() {
  // Adds the required packages to the app
  const inquirer = require("inquirer");
  const fs = require("fs");
  const mysql = require("mysql2/promise");
  const conTable = require("console.table");
  const questions = await require("./public/questions");

  console.clear();

  // Actions
  /*   const mainActionSwitch = async ({ firstAction, secondAction }) => {
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
            let { name, salary, departmentId } = await inquirer
              .prompt(addRoleQuestions)
              .catch(console.log);
            await db.execute(fs.readFileSync(pathAdd, { encoding: "utf8" }), [
              name,
              salary,
              departmentId,
            ]);
            init();
            break;
          case "employees":
            let { firstName, lastName, roleId, managerId } = await inquirer
              .prompt(addEmployeeQuestions)
              .catch(console.log);
            await db.execute(fs.readFileSync(pathAdd, { encoding: "utf8" }), [
              firstName,
              lastName,
              roleId,
              managerId,
            ]);
            init();
            break;
        }
      case "quit":
        process.exit();
    }
  }; */

  const firstActionSwitch = async ({ firstAction }) => {
    switch (firstAction) {
      // View Actions
      case "view":
      case "add":
      case "edit":
        inquirer
          .prompt(questions.secondQuestion)
          .then(({ secondAction }) => secondActionSwitch(firstAction, secondAction))
          .catch(console.log);
        break;
      case "quit":
        process.exit();
    }
  };

  const secondActionSwitch = async (firstAction, secondAction) => {
    switch (secondAction) {
      case "departments":
      case "roles":
      case "employees":
        switch (firstAction) {
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
                let { newDepartment } = await inquirer
                  .prompt(questions.addDepartmentQuestion)
                  .catch(console.log);
                await db.execute(fs.readFileSync(pathAdd, { encoding: "utf8" }), [newDepartment]);
                init();
                break;
              case "roles":
                let { name, salary, departmentId } = await inquirer
                  .prompt(questions.addRoleQuestions)
                  .catch(console.log);
                await db.execute(fs.readFileSync(pathAdd, { encoding: "utf8" }), [
                  name,
                  salary,
                  departmentId,
                ]);
                init();
                break;
              case "employees":
                let { firstName, lastName, roleId, managerId } = await inquirer
                  .prompt(questions.addEmployeeQuestions)
                  .catch(console.log);
                await db.execute(fs.readFileSync(pathAdd, { encoding: "utf8" }), [
                  firstName,
                  lastName,
                  roleId,
                  managerId,
                ]);
                init();
                break;
            }
          // Edit Actions
          case "edit":
            const pathUpdate = `./db/inserts/${secondAction}Update.sql`;

            switch (secondAction) {
              case "departments":
                let { newDepartment } = await inquirer
                  .prompt(questions.addDepartmentQuestion)
                  .catch(console.log);
                await db.execute(fs.readFileSync(pathUpdate, { encoding: "utf8" }), [
                  newDepartment,
                ]);
                init();
                break;
              case "roles":
                let { name, salary, departmentId } = await inquirer
                  .prompt(questions.addRoleQuestions)
                  .catch(console.log);
                await db.execute(fs.readFileSync(pathUpdate, { encoding: "utf8" }), [
                  name,
                  salary,
                  departmentId,
                ]);
                init();
                break;
              case "employees":
                let { firstName, lastName, roleId, managerId } = await inquirer
                  .prompt(questions.addEmployeeQuestions)
                  .catch(console.log);
                await db.execute(fs.readFileSync(pathUpdate, { encoding: "utf8" }), [
                  firstName,
                  lastName,
                  roleId,
                  managerId,
                ]);
                init();
                break;
            }
            break;
        }
        break;
      case "quit":
        process.exit();
    }
  };

  // Initializes the app
  const init = () => {
    inquirer.prompt(questions.firstQuestion).then(firstActionSwitch).catch(console.log);
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
