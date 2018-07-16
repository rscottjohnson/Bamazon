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

// First display all of the items available for sale. Include the ids, names, and prices of products for sale.
function showInventory() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    console.log(divider);

    // Log all results of the SELECT statement
    for (var i = 0; i < res.length; i++) {
      console.log(
        "Item ID: " + res[i].item_id + " | " + "Product Name: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: $" + res[i].price + " | " + "Stock Qty: " + res[i].stock_quantity);
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
      console.log(answer.prodPick);
      console.log(answer.prodUnits);
    });
}

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.
