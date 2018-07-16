// ===========================================================
// VARIABLES
// ===========================================================

var mysql = require("mysql");
var inquirer = require("inquirer");

var divider =
  "\n============================================================\n";

var connection = mysql.createConnection({
  host: "localhost",

  port: 8889,

  user: "root",

  password: "root",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  showInventory();
});

// ===========================================================
// FUNCTIONS
// ===========================================================

// First display all of the items available for sale. Include the ids, names, and prices of products for sale.
function showInventory() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    console.log(divider);

    // Log all results of the SELECT statement
    for (var i = 0; i < res.length; i++) {
      console.log(
        "Item ID: " + res[i].item_id + " | " + "Product Name: " + res[i].product_name + " | " + "Price: $" + res[i].price);
    }
    console.log(divider);
    customerMenu();
  });
}

// Prompt user with two messages:
// * The ID of the product they would like to buy
// * How many units of the product they would like to buy
function customerMenu() {
  inquirer
    .prompt([{
        name: "prodPick",
        type: "input",
        message: "Welcome to Bamazon.  Please enter the Item ID of the product that you would like to buy:"
      },
      {
        name: "prodUnits",
        type: "input",
        message: "Please enter the number of units of the product you would like to buy:"
      }
    ]).then(function (answer) {
      connection.query("SELECT * FROM products WHERE ?", {
        item_id: answer.prodPick
      }, function (err, res) {
        console.log("Item ID: " + res[0].item_id + " | " + "Product Name: " + res[0].product_name + " | " + "Price: $" + res[0].price);

        // Check for enough product inventory
        if (res[0].stock_quantity < answer.prodUnits) {
          // If not, log `Insufficient quantity!`, and stop the order
          console.log("Sorry, we have insufficient quantity to complete your order.");
          connection.end();
        } else {
          // If inventory available, fulfill the order.
          // * Update the SQL database to the remaining quantity
          connection.query(
            "UPDATE products SET ? WHERE ?", [{
                stock_quantity: (res[0].stock_quantity - answer.prodUnits)
              },
              {
                item_id: answer.prodPick
              }
            ],
            function (error) {
              if (error) throw err;
              // * Show the customer the total purchase cost
              console.log("Order quantity: " + answer.prodUnits + " | " + "Price: $" + res[0].price + " | " + "Total purchase: $" + (answer.prodUnits * res[0].price));
              connection.end();
            }
          );
        }
      })
    })
};