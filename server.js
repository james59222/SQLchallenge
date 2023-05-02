// Variable Definitions & Dependencies
const inquirer = require('inquirer');
const db = require('./db/connection');

//All questions menu
function start() {
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a new department",
                "Add a new role",
                "Add a new employee",
                "Update employee roles",
                "Exit"
            ]
        }])
        .then(function (answer) {
            switch (answer.action) {
                case "View all departments":
                    viewDepartments();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "Add a new department":
                    addDepartment();
                    break;
                case "Add a new role":
                    addRole();
                    break;
                case "Add a new employee":
                    addEmployee();
                    break;
                case "Update employee roles":
                    updateEmployee();
                    break;
                case "exit":
                    db.end();
                    break;
            }
        });
};
//View departments
function viewDepartments() {
    db.query('select * from department', (err, res) => {
        if (err) throw err
        console.table(res)
        start()
    })
}

//view roles
function viewRoles() {
    db.query('select * from role', (err, res) => {
        if (err) throw err
        console.table(res)
        start()
    })
}

//view employees
function viewEmployees() {
    db.query('select * from employee', (err, res) => {
        if (err) throw err
        console.table(res)
        start()
    })
}

//view departments
function addDepartment() {
    inquirer.prompt([{
        type: 'input',
        message: 'please enter name for new department',
        name: 'department'
    }]).then(data => {
        db.query('insert into department set ?', {
            name: data.department,
        })
        start()
    })
}

//add roles
function addRole() {
    inquirer.prompt([{
        type: 'input',
        message: 'please enter name for new role',
        name: 'role'

    }, {
        type: 'input',
        message: 'what is the salary for this role',
        name: 'salary'
    }, {
        type: 'list',
        message: 'what department id is this role in',
        name: 'department_id',
        choices: [1, 2, 3, 4]
    }
    ]).then(data => {
        db.query('insert into role set ?', {
            title: data.role,
            salary: data.salary,
            department_id: data.department_id
        })
        start()
    })
}


//add employees
function addEmployee() {
    inquirer.prompt([{
        type: 'input',
        message: 'please enter first name for new employee',
        name: 'first_name'
    }, {
        type: 'input',
        message: 'please enter last name for new employee',
        name: 'last_name'
    }, {
        type: 'list',
        message: 'please enter the role id for new employee',
        name: 'role_id',
        choices: [1, 2, 3, 4]
    }

    ]).then(data => {
        db.query('insert into employee set ?', {
            first_name: data.first_name,
            last_name: data.last_name,
            role_id: data.role_id,
        })
        start()
    })
}

//update role for employee
function updateEmployee() {
    inquirer.prompt([{
        type: 'input',
        message: 'please enter employee id to update role',
        name: 'employee_id'
    },
    {
        type: 'input',
        message: 'please enter employee new role id',
        name: 'role_id'

    }]).then(data => {
        console.log(data)
        db.query('UPDATE employee set role_id = ? where id = ?',[data.role_id,data.employee_id], (err,result) => {
        if (err) throw err; 
        console.log('sucessfull', result)
        start()
        })
    })
}


start()