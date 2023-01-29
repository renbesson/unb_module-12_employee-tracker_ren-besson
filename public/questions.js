// Bundled questions
const firstQuestion = {
  message: "Please select an action you would like to perform:",
  type: "list",
  name: "firstAction",
  choices: [
    { name: "View", value: "view" },
    { name: "Add", value: "add" },
    { name: "Edit", value: "edit" },
    { name: "Quit", value: "quit" },
  ],
};

const secondQuestion = {
  message: (answers) => `Please select a category of what you would like to the action on:`,
  type: "list",
  name: "secondAction",
  choices: [
    { name: "Departments", value: "departments" },
    { name: "Roles", value: "roles" },
    { name: "Employees", value: "employees" },
    { name: "Quit", value: "quit" },
  ],
};

const addDepartmentQuestion = {
  message: "Please type the name of the new Department: ",
  type: "input",
  name: "newDepartment",
};

const addRoleQuestions = [
  {
    message: "Please type the name of the new Role: ",
    type: "input",
    name: "name",
  },
  {
    message: "Please type the salary for the new Role: ",
    type: "input",
    name: "salary",
  },
  {
    message: "Please type the department ID of the new Role: ",
    type: "input",
    name: "departmentId",
  },
];

const addEmployeeQuestions = [
  {
    message: "Please type the first name of the new Employee: ",
    type: "input",
    name: "firstName",
  },
  {
    message: "Please type the last name of the new Employee: ",
    type: "input",
    name: "lastName",
  },
  {
    message: "Please type the role ID of the new Employee: ",
    type: "input",
    name: "roleId",
  },
  {
    message: "Please type the manager ID of the new Employee: ",
    type: "input",
    name: "managerId",
  },
];

module.exports = {
  firstQuestion,
  secondQuestion,
  addDepartmentQuestion,
  addRoleQuestions,
  addEmployeeQuestions,
};
