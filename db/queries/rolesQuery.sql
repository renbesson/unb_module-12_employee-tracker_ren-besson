-- Query Roles --
SELECT roles.title AS "Job Title", roles.id AS "Role ID", departments.name AS Department, roles.salary AS Salary
        FROM roles
        JOIN departments ON roles.department_id = departments.id;