# Bamazon
### An Amazon-like storefront using Node.js &amp; MySQL

Bamazon is an Amazon-like storefront that takes in orders from customers and deplete stock from the store's inventory via a console interface.

## Motivation
Bamazon is a command line node app, which complies with the guidelines of:
* Utilizing npm packages to access and format data.
* Establishing a package.json for npm package version info and install requirements.
* Deploying to GitHub.

## Project Usefulness
This command line app is useful as a tool for working with database data through interaction and input from a user.  It provides an example of how npm packages can be utilized to assist in connecting to a database, and working with console logging table data from a database response.

## Getting Started
Upon loading, Bamazon presents the user with:

1.  A display all of the available items.  This includes the ids, names, and prices of products for sale.

![Customer view 1](https://github.com/rscottjohnson/Bamazon/blob/master/assets/ScreenShot-bamCust1.png)

6. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.

## APIs / Libraries / Technology used
In order to provide the user with this information, the following are used:

* npm - inquirer
* npm - mysql
* npm - console.table
* MySQL database
* sql schema and seeds for database

## Credits
Bamazon was created by Scott Johnson.