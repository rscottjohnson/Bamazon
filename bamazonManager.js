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
  managerOptions();
});

// ===========================================================
// FUNCTIONS
// ===========================================================

function managerOptions() {
  inquirer
    .prompt({
      name: "mgrOption",
      type: "list",
      message: "Please make a selection from the manager options below:",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function (answer) {
      switch (answer.mgrOption) {
        case "View Products for Sale":
          saleProducts();
          break;

        case "View Low Inventory":
          lowInventory();
          break;

        case "Add to Inventory":
          // addInventory function is not working...
          addInventory();
          break;

        case "Add New Product":
          console.log("Option 4")
          // songSearch();
          break;
      }
    });
}

function saleProducts() {
  var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
  connection.query(query, function (err, res) {

    console.log(divider);
    console.log("Current products for sale:");
    console.log(divider);

    // Log all results of the SELECT statement
    for (var i = 0; i < res.length; i++) {
      console.log(
        "Item ID: " + res[i].item_id + " | " + "Product Name: " + res[i].product_name + " | " + "Price: $" + res[i].price + " | " + "Stock Qty: " + res[i].stock_quantity);
    }
    console.log(divider);
    // connection.end();
    managerOptions();
  });
}

function lowInventory() {
  var query = "SELECT item_id, product_name, price, stock_quantity FROM products HAVING stock_quantity < 5";
  connection.query(query, function (err, res) {

    console.log(divider);
    console.log("Products with Low Inventory:");
    console.log(divider);

    // Log all results of the SELECT statement
    for (var i = 0; i < res.length; i++) {
      console.log(
        "Item ID: " + res[i].item_id + " | " + "Product Name: " + res[i].product_name + " | " + "Price: $" + res[i].price + " | " + "Stock Qty: " + res[i].stock_quantity);
    }
    console.log(divider);
    // connection.end();
    managerOptions();
  });
}

function addInventory() {
  inquirer
    .prompt([{
        name: "prodPick",
        type: "input",
        message: "Please enter the Item ID of the product that you would like to add inventory to:"
      },
      {
        name: "prodUnits",
        type: "input",
        message: "Please enter the number of units of the product to add to inventory:"
      }
    ]).then(function (answer) {
      connection.query("UPDATE products SET stock_quantity =" + (products.stock_quantity + answer.prodUnits) + "WHERE ?", {
          item_id: answer.prodPick
        },
        function (error) {
          if (error) throw err;
          managerOptions();
        });
    });
}