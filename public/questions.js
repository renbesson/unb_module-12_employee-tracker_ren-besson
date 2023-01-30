const inquirer = require("inquirer");

// Bundled questions
const mainQuestion = {
  message: "Please select an action you would like to perform:",
  type: "list",
  name: "mainAction",
  choices: [
    new inquirer.Separator("----- Simple Views -----"),
    { name: "View Departments", value: "viewDepartments" },
    { name: "View Roles", value: "viewRoles" },
    { name: "View Employees", value: "viewEmployees" },
    new inquirer.Separator("----- Add -----"),
    { name: "Add Department", value: "addDepartment" },
    { name: "Add Role", value: "addRole" },
    { name: "Add Employee", value: "addEmployee" },
    new inquirer.Separator("----- Edit -----"),
    { name: "Edit Employee's Role", value: "editEmployeesRole" },
    { name: "Edit Employee's Manager", value: "editEmployeesManager" },
    new inquirer.Separator("----- Delete -----"),
    { name: "Delete Department", value: "deleteDepartment" },
    { name: "Delete Role", value: "deleteRole" },
    { name: "Delete Employee", value: "deleteEmployee" },
    new inquirer.Separator("----- Custom Views -----"),
    { name: "Total Salaries By Department", value: "salaryByDepartment" },
    new inquirer.Separator("----- Quit Option -----"),
    { name: "Quit", value: "quit" },
  ],
};

const departmentAddQuestions = {
  message: "Please type the name of the new Department: ",
  type: "input",
  name: "newDepartment",
};

const roleAddQuestions = [
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

const employeeAddQuestions = [
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

const employeesroleEditQuestions = [
  {
    message: "Please type the ID of the new role: ",
    type: "input",
    name: "roleId",
  },
  {
    message: "Please type the ID of the Employee: ",
    type: "input",
    name: "employeeId",
  },
];

const employeesmanagerEditQuestions = [
  {
    message: "Please type the ID of the new manager: ",
    type: "input",
    name: "managerId",
  },
  {
    message: "Please type the ID of the Employee: ",
    type: "input",
    name: "employeeId",
  },
];

// DELETE QUESTIONS
const departmentDeleteQuestions = [
  {
    message: "Please type the ID of the department: ",
    type: "input",
    name: "deleteId",
  },
  {
    message: "Are you sure you want to delete? ",
    type: "confirm",
    name: "deleteConfirm",
  },
];
const roleDeleteQuestions = [
  {
    message: "Please type the ID of the role: ",
    type: "input",
    name: "deleteId",
  },
  {
    message: "Are you sure you want to delete? ",
    type: "confirm",
    name: "deleteConfirm",
  },
];
const employeeDeleteQuestions = [
  {
    message: "Please type the ID of the employee: ",
    type: "input",
    name: "deleteId",
  },
  {
    message: "Are you sure you want to delete? ",
    type: "confirm",
    name: "deleteConfirm",
  },
];

module.exports = {
  mainQuestion,
  departmentAddQuestions,
  roleAddQuestions,
  employeeAddQuestions,
  employeesroleEditQuestions,
  employeesmanagerEditQuestions,
  departmentDeleteQuestions,
  roleDeleteQuestions,
  employeeDeleteQuestions,
};
