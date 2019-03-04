var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    user: "root",
  
    password: "Sheldon$7",
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
                "I WANT TO BUY SOMETHING",
                "I just have a question...",
                "I'm just here to look, geez",
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
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

function artistSearch() {
    inquirer
      .prompt({
        name: "artist",
        type: "input",
        message: "What artist would you like to search for?"
      })
      .then(function(answer) {
        var query = "SELECT position, song, year FROM top5000 WHERE ?";
        connection.query(query, { artist: answer.artist }, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
          }
          runSearch();
        });
      });
  }

function whatYouWantBuy() {
    inquirer
        .prompt(
            {
            name: "Confirm",
            type: "confirm",
            message: "You have ID for what you want??",
            defult: true
            },
            {
            name: "id",
            tpye: "input",
            message: "Then enter ID for what you want"
            }
        )
        .then(function(answer) {
            var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM bamazon * WHERE ?";
            connection.query(query, { id: answer.id }, function(err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log(
                        "ID: " 
                        + res[i].id
                        + "Product: "
                        + res[i].product_name
                        + "Department: "
                        + res[i].department_name
                        + "Price: "
                        + res[i].price
                        + "Quantity in Stock: "
                        + res[i].stock_quantity
                    );
                };

                whatYouWant();

            });
        });
};

function whatYourQuestionThen() {
    inquirer
    .prompt(
        {
        name: "question",
        type: "input",
        message: "What your question then??"
        },
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
                connection.end();
                break;
            case "Ok...":
                connection.end();
                break;
        }
    });
};



