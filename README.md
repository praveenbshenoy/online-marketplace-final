# Online Marketplace

This application in its current scope is used for setting up the infrastructure
for an online markpetplace. The scope of the current project is to authenticate
and add various users - admins, store owners, online shoppers (via self-sign) as
well as add store fronts to the online marketplace.

I used the react-redux-authentication boilerplate from
https://truffleframework.com/boxes as the starting point for this project

## Installation

1. Download or clone the project from github and store on local vm

2. To compile the contract, run the following from the project home folder
    truffle compile

3. To run the tests for the project
    truffle test

4. Launch ganache-cli from the prompt
    ganache-cli -b 10s

5. Make a note of the 10 accounts generated and the 10 private keys.
    Note: This activity must be performed each time ganache-cli is stopped and
    restarted    

6. Compile and migrate the smart contracts.
    truffle migrate --reset

7. Run the `liteserver` development server (outside the development console) for
   front-end hot reloading. Smart contract changes must be manually recompiled
   and migrated.

    npm run start

    Note: 1. If browser does not load, please launch broswer manually and type  
    in url http://localhost:3000
    Note: 2. I have used google Chrome browser extensively for this. So my
    instructions are based on Chrome


## How the app works

1. Launching the browser brings the home page with login and sign-up options

2. Before proceeding forward, ensure you have metamask chrome extension
   installed on Google Chrome browser (this should work for other browsers as
   well)

3. Login to metamask chrome extension (you will need to setup an account if you
   do not have one). Please note metamask sign-in is required each time a fresh
   browser is closed and re-opened.   

4. From the list of accounts and private keys available from ganache-cli,
   please setup three accounts (use the first account for amin) in metamask
   by importing the private keys - one for admin, one for store owner, one for
   online shopper. (Change account names so they are easy to interpret - admin,
   storeowner, onlineshopper)   

5. Once the accounts are setup, use the admin account in metamask first.

6. The first account (account[0]) is the owner of the contract and also the
   default admin. Once metamask has this account as the current active
   (indicated by a checkmark), click login.

7. As the default admin is already setup, you will be automatically logged in.
   You will see the following buttons - Dashboard, Profile, Add Admin,
   Add Store Owner, Add Storefront, Logout.

8. While all buttons are visible to all roles (due to lack of web design skills)
   the smart contract does handle logic on which role can do what.
   Admin can only update their own Profile, Add Admin or Add Store Owner. You can
   try any of these buttons. Console messages are displayed to indicate state
   change   

9. When logged in as Admin, click Add Store Owner button and add the name and
   address (40 char hex) corresponding to the private key that you used to setup
   store owner in Metamask.

10. Once the Store Owner is created, clcik Logout button. Change metamask
    account to the store owner just created, and click Login in the app. This
    now log you in as the store owner. Verify that the name of store owner
    entered while creating now reflects from the blockchain upon login.

11. As a store owner, you can try creating a store front by clicking the Add
     Store Front button. A store owner can create as many store front as long as
     the name of each stoe front is unique across the marketplace. If
     successfully created, the console displays on the browser with the correct
     message to indicate state change.

12. Logout as store owner. In metamask, login as the online shopper. The use the
    Sign-up button, enter a name and create an account.

13. Use Profile button, to change the name as applicable.

14. Clicking on dashboard will display the current ethereum account name.

These are the main UI functions developed. Due to challenges in web development
skills, additional functions will be developed in future to display storefronts,
add products to store fronts and perform buyer-seller transactions of products.

The main purpose of this project was to demonstrate interaction between UI and
the smart contract, authenticate and create users, perform role based functions.

# Checklist for evaluator per the Evaluation form
1. README.md - Included in project folder
2. Truffle compile, migrate, test - Instructions provided above.
3. Project is commented as outline in the documentation - check Migration.sol
4. At least one contract uses a library or inherits from another contract -
   check Migration.sol which uses Killable.sol
5. Run the app on a dev server - instructions provided above (npm run start)
6. Visit a URL and interact with the app - use http://localhost:3000 when
   running the dev server   
7. The app displays the current ethereum account - login as any user and click
   on dashboard buttom to view current logged in ethereum account name. The
   current ethereum account address will be displayed in metamask.
8. I can sign transactions using metamask - this can be observed during adding
    admin, store owner, or store front   
9. The app interface reflects updates to the contract state - use profile to
    change name and then click on dashboard and you can see the new name
    reflecting the update.
10. 5 tests written in Javascript - check the test folder
11. Tests are explained with brief code comments - check marketplace.js in test
     folder.
12. Test are properly structured -  check marketplace.js in test folder.           
13. All tests pass - run truffle test
14. At least one of the contracts implements a circuit breaker - check emergency
    functionality in Migration.sol
15. Project includes a file called design_pattern_decisions.md - Included
16. design_pattern_decisions.md adequately describes the design pattern -
    Included in file
17. Project includes a file called avoiding_common_attacks.md - included
18. avoiding_common_attacks.md covers at least 2 common attacks - Included
19. Project includes a file called deployed_addresses.txt - Included & deployed
     on Rinkeby        
