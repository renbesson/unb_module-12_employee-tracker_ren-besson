INSERT INTO departments (name)
VALUES ("IT"),
       ("Management"),
       ("Human Resources"),
       ("Customer Service");
       

INSERT INTO roles (title, salary, department_id)
VALUES ("CEO", 10340, 002),
       ("IT Technichian", 3043, 001),
       ("HR Manager", 3940, 003),
       ("CS Representative", 2543, 004);
       
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Clark", "Still", 3, 4),
       ("Benimaru", "Nikaido", 4, 4),
       ("Shingo", "Yabuki", 4, 4),
       ("Mai", "Shiranui", 1, 4);