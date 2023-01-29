INSERT INTO departments (name)
VALUES ("IT"),
       ("Management"),
       ("Human Resources"),
       ("Customer Service");
       

INSERT INTO roles (id, title, salary, department_id)
VALUES (574, "CEO", 10340, 002),
       (753, "IT Technichian", 3043, 001),
       (352, "HR Manager", 3940, 003),
       (975, "CS Representative", 2543, 004);
       
INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (043, "Clark", "Still", 574, NULL),
       (493, "Benimaru", "Nikaido", 975, 574),
       (095, "Shingo", "Yabuki", 352, 574),
       (773, "Mai", "Shiranui", 975, 574);