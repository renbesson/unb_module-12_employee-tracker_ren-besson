INSERT INTO departments (id, name)
VALUES (001, "IT"),
       (002, "Management"),
       (003, "Human Resources"),
       (004, "Customer Service");
       

INSERT INTO roles (id, title, salary, department_id)
VALUES (574, "CEO", 1034000, 002),
       (753, "IT Technichian", 304300, 001),
       (352, "HR Manager", 394000, 003),
       (975, "CS Representative", 254300, 004);
       
INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (043, "Clark", "Still", 574, NULL),
       (493, "Benimaru", "Nikaido", 975, 574),
       (095, "Shingo", "Yabuki", 352, 574),
       (773, "Mai", "Shiranui", 975, 574);