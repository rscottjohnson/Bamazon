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
        "Add New Product",
        "Exit"
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
          addInventory();
          break;

        case "Add New Product":
          addProduct();
          break;

        case "Exit":
          exit();
          break;
      }
    });
}

function saleProducts() {
  // Empty the arrays that support console.table
  resArray = [];
  tableArray = [];

  var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
  connection.query(query, function (err, res) {

    console.log(divider);
    console.log("Current products for sale:");
    console.log(divider);

    // Build the table array
    for (var i = 0; i < res.length; i++) {
      resArray.push(res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity);
      tableArray.push(resArray);
      resArray = [];
    }

    // Console log the table
    console.table(["Item ID", "Product Name", "Price ($)", "Stock Quantity"], tableArray);
    console.log(divider);
    managerOptions();
  });
}

function lowInventory() {
  // Empty the arrays that support console.table
  resArray = [];
  tableArray = [];

  var query = "SELECT item_id, product_name, price, stock_quantity FROM products HAVING stock_quantity < 5";
  connection.query(query, function (err, res) {

    console.log(divider);
    console.log("Products with Low Inventory:");
    console.log(divider);

    if (res.length === 0) {
      console.log("NONE");
    } else {
      
      // Build the table array
      for (var i = 0; i < res.length; i++) {
        resArray.push(res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity);
        tableArray.push(resArray);
        resArray = [];
      }
      // Console log the table
      console.table(["Item ID", "Product Name", "Price ($)", "Stock Quantity"], tableArray);
    }
    console.log(divider);
    managerOptions();
  });
}

function addInventory() {
  connection.query("SELECT * FROM products", function (err, res) {
    inquirer
      .prompt([{
          name: "prodPick",
          type: "input",
          message: "Please enter the Item ID of the product that you would like to add inventory to:",
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
          message: "Please enter the number of units of the product to add to inventory:",
          validate: function (value) {
            if (isNaN(value) === false && value > 0) {
              return true;
            }
            return false;
          }
        }
      ]).then(function (answer) {
        connection.query("SELECT stock_quantity FROM products WHERE ?", {
          item_id: answer.prodPick
        }, function (err, res) {
          if (err) throw err;
          var newStock = res[0].stock_quantity + parseInt(answer.prodUnits);
          connection.query("UPDATE products SET ? WHERE ?", [{
              stock_quantity: newStock
            }, {
              item_id: answer.prodPick
            }],
            function (error) {
              if (error) throw err;
              console.log(divider);
              console.log("Inventory updated");
              console.log(divider);
              managerOptions();
            });
        });
      });
  });
}

function addProduct() {
  inquirer
    .prompt([{
        name: "prodName",
        type: "input",
        message: "Please enter the name of the product to be added:"
      },
      {
        name: "deptName",
        type: "input",
        message: "Please enter the department that the product should be placed into:"
      },
      {
        name: "prodPrice",
        type: "input",
        message: "Please enter the price for the product being added:",
        validate: function (value) {
          if (isNaN(value) === false && value > 0) {
            return true;
          }
          return false;
        }
      },
      {
        name: "prodStock",
        type: "input",
        message: "Please enter the beginning stock of the product being added:",
        validate: function (value) {
          if (isNaN(value) === false && value > 0) {
            return true;
          }
          return false;
        }
      }
    ]).then(function (answer) {
      connection.query("INSERT INTO products SET ?", {
          product_name: answer.prodName,
          department_name: answer.deptName,
          price: answer.prodPrice,
          stock_quantity: answer.prodStock
        },
        function (err) {
          if (err) throw err;
          console.log(divider);
          console.log("Product has been added to inventory.");
          console.log(divider);
          managerOptions();
        });
    });
}

function exit() {
  console.log(divider);
  console.log("Goodbye.");
  console.log(divider);
  connection.end();
}