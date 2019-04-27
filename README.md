# Bamazon

An Inquirer-based application that allows customers to view avaible products and buy them

## How to use it

After cloning the repository, within your terminal:

```
npm install inquirer

npm install mysql
```

Then within MySQL Workbench:

* Open SQL Script

![Screenshot of MySQL](https://github.com/FrickittyFrack/bamazon/raw/master/images/mysql.PNG)

* And select the bamazon.sql file

![Screenshot of MySQL](https://github.com/FrickittyFrack/bamazon/raw/master/images/mysql-open.PNG)

* Then run the code in Workbench to create the table

* Then right click the tables under bamazon to import the csv file

![Screenshot of MySQL](https://github.com/FrickittyFrack/bamazon/raw/master/images/mysql-import.PNG)

* Select the products.csv file

* And follow the steps to import the file

![Screenshot of MySQL](https://github.com/FrickittyFrack/bamazon/raw/master/images/mysql-import2.PNG)

From there, navigate to the file in your terminal and run:

```
node bamazoncustomer.js
```

## In action

When first running the script, customers will be prompted

![Screenshot of MySQL](https://github.com/FrickittyFrack/bamazon/raw/master/images/cap-prompt.PNG)

Choosing to list products, will result in the expected fashion

![Screenshot of MySQL](https://github.com/FrickittyFrack/bamazon/raw/master/images/cap-list-products.PNG)

At the end of the list, the customer is brought back to the same prompt

![Screenshot of MySQL](https://github.com/FrickittyFrack/bamazon/raw/master/images/cap-list-products2.PNG)

If chosen to purchase something, customers are asked for the ID of the product they want

And if they don't know, are swiftly asked to leave

![Screenshot of MySQL](https://github.com/FrickittyFrack/bamazon/raw/master/images/cap-select-nope.PNG)

But, if they do, they are then prompted to give the ID number

![Screenshot of MySQL](https://github.com/FrickittyFrack/bamazon/raw/master/images/cap-select-yes.PNG)

After which, the customer is shown info about the item and asked to clarify that that is what they want

![Screenshot of MySQL](https://github.com/FrickittyFrack/bamazon/raw/master/images/cap-choice-made.PNG)

If not, they are asked again

![Screenshot of MySQL](https://github.com/FrickittyFrack/bamazon/raw/master/images/cap-no.PNG)

If yes, they are told the total and prompted to buy more or leave

![Screenshot of MySQL](https://github.com/FrickittyFrack/bamazon/raw/master/images/cap-yes.PNG)

Leaving ends the connection

![Screenshot of MySQL](https://github.com/FrickittyFrack/bamazon/raw/master/images/cap-leave-store.PNG)

Buying more prompts the customer for an ID again

![Screenshot of MySQL](https://github.com/FrickittyFrack/bamazon/raw/master/images/cap-buy-more.PNG)

Returning to the beginning...

It is to be noted that this store does not answer any questions

![Screenshot of MySQL](https://github.com/FrickittyFrack/bamazon/raw/master/images/cap-question.PNG)

And is a no-nonsense store

![Screenshot of MySQL](https://github.com/FrickittyFrack/bamazon/raw/master/images/cap-question2.PNG)

There will also be no looking if not to buy

![Screenshot of MySQL](https://github.com/FrickittyFrack/bamazon/raw/master/images/cap-no-looking.PNG)