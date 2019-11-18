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
    // run the start function after the connection is made to prompt the user
    //start();
    //console.log("Connected")
    listProducts();
    start();
});

function listProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("Here is what's for sale today: ")
        for (var i = 0; i < res.length; i++) {
            console.log("ID Number: " + res[i].item_id + ", Product Name: " + res[i].product_name + ", Price: $" + res[i].price);
        }
    });
}

function start() {
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
                    message: "What is the ID of the product you would like to buy?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many units of that product would you like to buy?"
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

                // determine if there is enough in stock
                if (parseInt(answer.quantity) < chosenItem.stock_quantity) {

                    var newQuantity = (chosenItem.stock_quantity - parseInt(answer.quantity));
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
                            console.log("Congratulations on your purchase. You spent $" + (parseInt(answer.quantity) * chosenItem.price) + " on " + chosenItem.product_name + "(s). There are now " + newQuantity + " " + chosenItem.product_name + "(s) left");
                        }
                    );
                    start();
                }
                else {
                    console.log("Insufficient quantity");
                    start();
                }
            });
    });
}
