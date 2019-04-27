var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    user: "root",
  
    password: "",
    database: "bamazon"
});
  
connection.connect(function(err) {
    if (err) throw err;
    whatYouWant();
});

function whatYouWant() {
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What you want??",
        choices: [
            "I need to see what you have in stock!!",
            "I WANT TO BUY SOMETHING",
            "I just have a question...",
            "I'm just here to look, geez",
        ]
    })
        .then(function(answer) {
            switch (answer.action) {
                case "I need to see what you have in stock!!":
                    listItemsInStock();
                    break;

                case "I WANT TO BUY SOMETHING":
                    whatYouWantBuy();
                    break;
                
                case "I just have a question...":
                    whatYourQuestionThen();
                    break;
                
                case "I'm just here to look, geez":
                    connection.end();
                    break;
            }
        });
};

function whatYouWantBuy() {
    inquirer
    .prompt(
        {
        name: "Confirm",
        type: "list",
        message: "You have ID for what you want??",
        choices: [
            "Yes",
            "Nope"
        ]
        },
    )
    .then(function(confirm) {
        switch (confirm.Confirm) {
            case "Yes":
                inquirer
                .prompt(
                    {
                    name: "idInput",
                    type: "input",
                    message: "Then enter ID for what you want"
                    }
                )
                .then(function(input) {
                    connection.query(
                        "SELECT * FROM products WHERE item_id = ?", 
                        [input.idInput], 
                        function(err, res) {
                            if (err) throw err;

                            var product = res[0];

                            console.log(
                                "\n--------------------------------\n" +
                                "\nID: " + product.item_id +
                                "\nProduct: " + product.product_name +
                                "\nDepartment: " + product.department_name +
                                "\nPrice: " + product.price +
                                "\nIn Stock: " + product.stock_quantity +
                                "\n\n--------------------------------\n"
                            );
                            
                            inquirer
                            .prompt(
                                {
                                name: "YouSure",
                                type: "confirm",
                                message: "You want " + product.product_name + "?",
                                default: true
                                }
                            )
                            .then(function(response) {
                                if(response.YouSure === true) {
                                    inquirer
                                    .prompt(
                                        {
                                        name: "HowMany",
                                        type: "input",
                                        message: "How many " + product.product_name + " you want?",
                                        }
                                    )
                                    .then(function(number) {
                                        
                                        var newQuantity = product.stock_quantity - number.HowMany;
                                        
                                        connection.query(
                                            "UPDATE products SET stock_quantity = ? WHERE item_id = ?", 
                                            [newQuantity, product.item_id], 
                                            function(err, res) {
                                                console.log(
                                                    "\nHere,\n\nI give you " +
                                                    number.HowMany + " " +
                                                    product.product_name +
                                                    "\n"
                                                );
                                                inquirer
                                                .prompt(
                                                    {
                                                    name: "LeaveOrBuy",
                                                    type: "list",
                                                    message: "Now leave my store or buy something else",
                                                    choices: [
                                                        "Leave store",
                                                        "Buy more"
                                                    ]
                                                    }
                                                )
                                                .then(function(choice) {
                                                    switch(choice.LeaveOrBuy) {
                                                        case "Leave store":
                                                            console.log("You have good day now!");
                                                            connection.end();
                                                            break;
                                                        case "Buy more":
                                                            whatYouWantBuy();
                                                    };
                                                });
                                        });
                                    });
                                } else {
                                    whatYouWantBuy();
                                }
                            });
                    });
                });
                break;
            
            case "Nope":
                console.log("Then come back when you do!!");
                connection.end();
                break;
        }
    });
};

function whatYourQuestionThen() {
    inquirer
    .prompt(
        {
        name: "goaway",
        type: "list",
        message: "I only answer questions for customers. Go away.",
        choices: [
            "You have terrible customer service...",
            "Ok...",
        ]
        }
    )
    .then(function(response) {
        switch (response.goaway) {
            case "You have terrible customer service...":
                console.log("Yes, now leave!");
                connection.end();
                break;
            case "Ok...":
                connection.end();
                break;
        }
    });
};

function listItemsInStock() {
    console.log("ITEMS IN STOCK");
    connection.end();
};

