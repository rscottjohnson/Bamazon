// ===========================================================
// VARIABLES
// ===========================================================

var mysql = require("mysql");
var inquirer = require("inquirer");
var ctable = require("console.table");

var divider =
  "============================================================";

var resArray = [];
var tableArray = [];

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
  // Empty the arrays that support console.table
  resArray = [];
  tableArray = [];

  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    console.log(divider);

    // Build the table array
    for (var i = 0; i < res.length; i++) {
      resArray.push(res[i].item_id, res[i].product_name, res[i].price);
      tableArray.push(resArray);
      resArray = [];
    }

    // Console log the table
    console.table(["Item ID", "Product Name", "Price ($)"], tableArray);
    console.log(divider);
    customerMenu();
  });
}

// Prompt user with two messages:
// * The ID of the product they would like to buy
// * How many units of the product they would like to buy
function customerMenu() {
  // Empty the arrays that support console.table
  resArray = [];
  tableArray = [];

  connection.query("SELECT * FROM products", function (err, res) {
    inquirer
      .prompt([{
          name: "prodPick",
          type: "input",
          message: "Welcome to Bamazon.  Please enter the Item ID of the product that you would like to buy:",
          validate: function (value) {
            if (isNaN(value) === false && value > 0) {
              if (value <= res.length) {
                return true;
              }
              return false;
            }
            return false;
          }
        },
        {
          name: "prodUnits",
          type: "input",
          message: "Please enter the number of units of the product you would like to buy:",
          validate: function (value) {
            if (isNaN(value) === false && value > 0) {
              return true;
            }
            return false;
          }
        }
      ]).then(function (answer) {
        connection.query("SELECT * FROM products WHERE ?", {
          item_id: answer.prodPick
        }, function (err, res) {

          // Build the table array
          resArray.push(res[0].item_id, res[0].product_name, res[0].price);
          tableArray.push(resArray);

          // Console log the table
          console.log(divider);
          console.table(["Item ID", "Product Name", "Price ($)"], tableArray);
          console.log(divider);

          // Check for enough product inventory
          if (res[0].stock_quantity < answer.prodUnits) {
            // If not, log `Insufficient quantity`, and stop the order
            console.log("Sorry, we have insufficient quantity to complete your order.");
            console.log(divider);
            connection.end();
          } else {
            // If inventory available, fulfill the order.
            // Update the SQL database to the remaining quantity
            connection.query(
              "UPDATE products SET ? WHERE ?", [{
                  stock_quantity: (res[0].stock_quantity - answer.prodUnits)
                },
                {
                  item_id: answer.prodPick
                }
              ],
              function (error) {
                // Empty the arrays that support console.table
                resArray = [];
                tableArray = [];

                if (error) throw err;

                // Build the table array
                resArray.push(answer.prodUnits, res[0].price, (answer.prodUnits * res[0].price));
                tableArray.push(resArray);

                // Show the customer the total purchase cost by console logging the table
                console.table(["Order quantity", "Price ($)", "Total Purchase ($)"], tableArray);
                console.log(divider);
                connection.end();
              }
            );
          }
        })
      })
  });
}