var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon"
});


// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    viewLowInventory();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addProduct();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}

function viewProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("\nHere is what's for sale today: ")
        for (var i = 0; i < res.length; i++) {
            console.log("ID Number: " + res[i].item_id + ", Product Name: " + res[i].product_name + ", Price: $" + res[i].price + ", Quantity: " + res[i].stock_quantity);
        }
        start();
    });
    
}

function viewLowInventory() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("Here are products with low inventory: ")
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                console.log("ID Number: " + res[i].item_id + ", Product Name: " + res[i].product_name + ", Quantity: " + res[i].stock_quantity);
            }
        }
        start();
    });
}

function addInventory() {
    // query the database for all products being offered
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to buy
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].item_id);
                        }
                        return choiceArray;
                    },
                    message: "What is the ID of the product you would like add inventory to?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many units of that product would you like to add to your stock?"
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === answer.choice) {
                        chosenItem = results[i];
                    }
                }
                var newQuantity = (chosenItem.stock_quantity + parseInt(answer.quantity));
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newQuantity
                        },
                        {
                            item_id: chosenItem.item_id
                        }
                    ],
                    function (error) {
                        if (error) throw error;
                        console.log("There are now " + newQuantity + " " + chosenItem.product_name + "(s) in stock.");
                        start();
                    }
                );
                
            });
        
    });
}

function addProduct() {
    inquirer
      .prompt([
        {
          name: "product",
          type: "input",
          message: "What is the name of the product you would like to add?"
        },
        {
          name: "department",
          type: "input",
          message: "What department would you like to place your product in?"
        },
        {
          name: "price",
          type: "input",
          message: "How much does this product cost?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units are you adding to the stock?",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
          }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answer.product,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
          },
          function(err) {
            if (err) throw err;
            console.log("Your products were added successfully!");
            start();
          }
        );
      });
  }
