   SELECT
        departments.name AS Department,
        SUM(roles.salary) AS "Total Salary"
    FROM employees
    JOIN roles ON role_id = roles.id
    JOIN departments ON roles.department_id = departments.id
   GROUP BY departments.name;