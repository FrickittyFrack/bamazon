var mysql = require("mysql");
var inquirer = require("inquirer");

// Define where to get connection for MySQL
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    user: "root",
    
    // Input personal password for MySQL
    password: "",
    database: "bamazon"
});

// Establish connection with MySQL  
connection.connect(function(err) {
    if (err) throw err;
    whatYouWant();
});

// Prompt customer to select 1 of 4 paths
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
                    console.log("Looking only for customer, get out!");
                    connection.end();
                    break;
            }
        });
};

// Lists items in stock
function listItemsInStock() {
    connection.query("SELECT * FROM products", function(err, recievedProducts) {

        if(err) throw err;
        
        for(var i = 0; i < recievedProducts.length; i++) {

            var product = recievedProducts[i];
            
            console.log(
                "\n--------------------------------\n" +
                "\nID: " + product.item_id +
                "\nProduct: " + product.product_name +
                "\nDepartment: " + product.department_name +
                "\nPrice: " + product.price +
                "\nIn Stock: " + product.stock_quantity +
                "\n\n--------------------------------\n"
            );
            
        };

        console.log("That's what we have, now...\n\n");

        whatYouWant();
        
    });
};

// Handle buying path
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
                                                    "\n~~~~~~~~~~~~~~~~~~~~~" +
                                                    "\nYour total $" +
                                                    (number.HowMany * product.price) +
                                                    "\n~~~~~~~~~~~~~~~~~~~~~\n\n"
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

// Handle question path
function whatYourQuestionThen() {
    inquirer

    // Only gives customers 2 options: both end connection
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
