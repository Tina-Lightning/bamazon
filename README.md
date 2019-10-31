# Bamazon

## Overview 

An Amazon-like CLI storefront built with mySQL, node.js and Inquirer NPM. The app can take in orders from customers, calculate sales price and deplete stock from the store's inventory.  A schema.sql has been been included for database creation. The application presents two interfaces: customer and manager.

## Customer Demo

The customer interface:

1. Presents the customer with a list of all available products
2. Asks for the ID of the customer's desired product
3. Asks how many items the customer would like to purchase
4. Confirms order & updates product inventory in database

### Examples:

1. Presents the customer with a list of all available products

    ![alt text](/screenshots/Customer-ListItems.png "Customer-ListItems".

2. Asks for the ID of the customer's desired product

    ![alt text](/screenshots/Customer-Purchase2.png "Customer-Purchase".

3. Asks how many items the customer would like to purchase
4. Confirms order & updates product inventory in database

    ![alt text](/screenshots/Customer-Purchase1.png "Customer-Purchase".


## Manager Demo

The manager interface presents a list of actions:

1. View Products for Sale
2. View Low Inventory
3. Add to Inventory
4. Add New Product

### Examples:

  * *See List of Manager Options*

    ![alt text](/screenshots/Manager-ToDo.png "Customer-Purchase".

1. *View Products for Sale*
    * Displays a list of all active products available to the customer

    ![alt text](/screenshots/Manager-ViewProducts1.png "Customer-Purchase".

2. *View Low Inventory*
    * Displays a list of all products with fewer than 5 items in stock (or a message that there are no low-stock items.

    ![alt text](/screenshots/Manager-LowInventory.png "Customer-Purchase".

3. *Add to Inventory*
    * Allows the manager to add more items to a product's inventory

    ![alt text](/screenshots/Manager-AddInventory.png "Customer-Purchase".

4. *Add New Product*
    * Allows the manager to list a new product that is available for purchase

    ![alt text](/screenshots/Manager-AddProduct.png "Customer-Purchase".

  * *See a list of the updated products*

    ![alt text](/screenshots/Manager-ViewProducts2.png "Customer-Purchase".


## Technologies Used:
  * JavaScript
  * Node.js
  * MySQL
  * Node Packages: 
    * mysql
    * inquirer
