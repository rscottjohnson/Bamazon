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
  });
}

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.

// function runSearch() {
//   inquirer
//     .prompt({
//       name: "action",
//       type: "list",
//       message: "What would you like to do?",
//       choices: [
//         "Find songs by artist",
//         "Find all artists who appear more than once",
//         "Find data within a specific range",
//         "Search for a specific song"
//       ]
//     })
//     .then(function (answer) {
//       switch (answer.action) {
//         case "Find songs by artist":
//           artistSearch();
//           break;

//         case "Find all artists who appear more than once":
//           multiSearch();
//           break;

//         case "Find data within a specific range":
//           rangeSearch();
//           break;

//         case "Search for a specific song":
//           songSearch();
//           break;
//       }
//     });
// }

