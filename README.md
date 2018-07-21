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

### Bamazon Customer Interface
Upon loading, Bamazon presents the user with:

1. A display all of the available items.  This includes the ids, names, and prices of products for sale.

![Customer view 1](https://github.com/rscottjohnson/Bamazon/blob/master/assets/ScreenShot-bamCust1.png)

2. The app should then prompt users with two messages.

   * The first asks them the ID of the product they would like to buy.
   * The second asks how many units of the product they would like to buy.
   * If the store has enough of the product, the order is fulfilled.
   * The SQL database is updated to reflect the remaining quantity.
   * The total cost of the purchase is presented to the customer.

  ![Customer view 2](https://github.com/rscottjohnson/Bamazon/blob/master/assets/ScreenShot-bamCust2.png)

3. If the store _doesn't_ have enough of the product, the app logs a phrase of `insufficient quantity`, and then prevents the order from going through.

   ![Customer view 3](https://github.com/rscottjohnson/Bamazon/blob/master/assets/ScreenShot-bamCust3.png)

### Bamazon Manager Interface

1. The manager is presented with five available options:
    * View products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product
    * Exit

  ![Manager view 1](https://github.com/rscottjohnson/Bamazon/blob/master/assets/ScreenShot-bamMgr1.png)

2. If a manager selects `View Products for Sale`, the app lists every available item: the item IDs, names, prices, and quantities.

![Manager view 2](https://github.com/rscottjohnson/Bamazon/blob/master/assets/ScreenShot-bamMgr2.png)

3. If a manager selects `View Low Inventory`, it lists all items with an inventory count lower than five.

![Manager view 3](https://github.com/rscottjohnson/Bamazon/blob/master/assets/ScreenShot-bamMgr3.png)

4. If a manager selects `Add to Inventory`, the app displays a prompt that will let the manager "add more" of any item currently in the store.

![Manager view 4](https://github.com/rscottjohnson/Bamazon/blob/master/assets/ScreenShot-bamMgr4.png)

![Manager view 5](https://github.com/rscottjohnson/Bamazon/blob/master/assets/ScreenShot-bamMgr5.png)

5. If a manager selects `Add New Product`, it allows the manager to add a completely new product to the store.

![Manager view 6](https://github.com/rscottjohnson/Bamazon/blob/master/assets/ScreenShot-bamMgr6.png)

![Manager view 7](https://github.com/rscottjohnson/Bamazon/blob/master/assets/ScreenShot-bamMgr7.png)

6. If a manager selects `Exit`, it quits the manager interface.

![Manager view 8](https://github.com/rscottjohnson/Bamazon/blob/master/assets/ScreenShot-bamMgr8.png)

## APIs / Libraries / Technology used
In order to provide the user with this information, the following are used:

* npm - inquirer
* npm - mysql
* npm - console.table
* MySQL database
* sql schema and seeds for database

## Credits
Bamazon was created by Scott Johnson.