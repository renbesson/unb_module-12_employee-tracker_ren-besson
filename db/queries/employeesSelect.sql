-- Query Employees --
SELECT
        employees.id AS "Employee ID",
        employees.first_name AS "First Name",
        employees.last_name AS "Last Name",
        roles.title AS "Job Title",
        departments.name AS Department,
        roles.salary AS Salary,
        CONCAT(employees.first_name, " ", employees.last_name) AS Manager
    FROM employees
    JOIN roles ON role_id = roles.id
    JOIN departments ON roles.department_id = departments.id;