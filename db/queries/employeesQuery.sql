-- Query Employees --
SELECT
		employees.id AS "Employee ID",
        employees.first_name AS "First Name",
        employees.last_name AS "Last Name",
        roles.title AS "Job Title",
        departments.name AS Department,
        roles.salary AS Salary,
        CONCAT(managers.first_name, " ", managers.last_name) AS Manager
    FROM employees
    LEFT OUTER JOIN roles ON role_id = roles.id
    LEFT OUTER JOIN departments ON roles.department_id = departments.id
    INNER JOIN employees managers ON managers.id = employees.manager_id;