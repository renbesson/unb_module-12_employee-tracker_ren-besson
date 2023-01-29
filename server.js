const path = require("path");

async function main() {
  // Adds the required packages to the app
  const inquirer = require("inquirer");
  const fs = require("fs");
  const mysql = require("mysql2/promise");
  const conTable = require("console.table");
  const questions = require("./public/questions");

  console.clear();

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

  // Actions
  const mainActionSwitch = async ({ mainAction }) => {
    const startsWithNumber = () => {
      if (mainAction.startsWith("add")) return 3;
      if (mainAction.startsWith("view")) return 4;
      if (mainAction.startsWith("edit")) return 4;
      if (mainAction.startsWith("delete")) return 6;
    };
    const category = mainAction.substring(startsWithNumber()).toLowerCase();
    console.log(category);
    if (mainAction.startsWith("view")) {
      const path = `./db/queries/${category}Query.sql`;
      const [rows] = await db.execute(fs.readFileSync(path, { encoding: "utf8" }));
      console.table(rows);
    } else if (mainAction.startsWith("add")) {
      const path = `./db/inserts/${category}Insert.sql`;
      let answersObj = await inquirer
        .prompt(questions[`${category}AddQuestions`])
        .catch(console.log);
      await db.execute(fs.readFileSync(path, { encoding: "utf8" }), [...Object.values(answersObj)]);
    } else if (mainAction.startsWith("edit")) {
      const path = `./db/updates/${category}Update.sql`;
      let answersObj = await inquirer
        .prompt(questions[`${category}EditQuestions`])
        .catch(console.log);
      await db.execute(fs.readFileSync(path, { encoding: "utf8" }), [...Object.values(answersObj)]);
    } else if (mainAction.startsWith("delete")) {
      const path = `./db/deletes/${category}Delete.sql`;
      let answersObj = await inquirer
        .prompt(questions[`${category}DeleteQuestions`])
        .catch(console.log);
      if (answersObj.deleteConfirm === true) {
        await db.execute(fs.readFileSync(path, { encoding: "utf8" }), [answersObj.deleteId]);
      }
    }
    init();
  };

  // Initializes the app
  const init = () => {
    inquirer.prompt(questions.mainQuestion).then(mainActionSwitch).catch(console.log);
  };

  // Function call to initialize app
  init();
}

main();
