USE employee_db;
INSERT INTO department(
    name
)
VALUES ('finance'), 
    ('engineering'),
    ('sales'), 
    ('legal');

    INSERT INTO role (
        title, salary, department_id
    )
VALUES ('accountant',90000,1),
('engineer',110000,2),
('account manager', 150000, 3),
('attorney', 200000, 4);

INSERT INTO employee(
    first_name, last_name, role_id
)
VALUES ('john','doe', 1),
('jack','black',2),
('jane','doe',3),
('susan','green',4);

