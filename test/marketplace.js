var Marketplace = artifacts.require("./Marketplace.sol");

//let web3 = store.getState().web3.web3Instance;
//console.log("loginUser:",web3);

contract('Marketplace', function(accounts) {

  const admin = accounts[0]; // default admin
  const adminAddress1 = accounts[1]; // address for a new admin
  const storeOwnerAddress1 = accounts[2]; // address for a new store owner
  const onlineShopperAddress1 = accounts[3]; // address for a new online shopper
  const admin1 = web3.utils.fromUtf8("admin91"); // to convert a string to bytes32 format
  const storeOwner1 = web3.utils.fromUtf8("storeowner91"); // to convert a string to bytes32 format
  const onlineShopper1 = web3.utils.fromUtf8("onlineshopper91"); // to convert a string to bytes32 format
  const updateOnlineShopper1 = web3.utils.fromUtf8("onlineshopper92"); // to convert a string to bytes32 format
  const storeFront1 = web3.utils.fromUtf8("storefront91"); // to convert a string to bytes32 format

  /* this test is for adding a new admin by an existing admin - the test validates that the new admin has been
     created and is able to login to the application */
  it("should add an admin and log in as the new admin.", function() {
    return Marketplace.deployed().then(function(instance) {
      marketplaceInstance = instance;

      return marketplaceInstance.addAdmin(admin1, adminAddress1, {from: accounts[0]});
    }).then(function() {
      return marketplaceInstance.login.call({from: accounts[1]});
    }).then(function(userName) {
      assert.equal(web3.utils.toUtf8(userName), 'admin91', "The admin was not added.");
    });
  });

  /* this test is for adding a new store owner by an existing admin - the test validates that the new store owner has been
     created and is able to login to the application */
  it("should add a store owner and log in as the new store owner.", function() {
    return Marketplace.deployed().then(function(instance) {
      marketplaceInstance = instance;

      return marketplaceInstance.addStoreOwner(storeOwner1, storeOwnerAddress1, {from: accounts[0]});
    }).then(function() {
      return marketplaceInstance.login.call({from: accounts[2]});
    }).then(function(userName) {
      assert.equal(web3.utils.toUtf8(userName), 'storeowner91', "The store owner was not added.");
    });
  });

  /* this test is for sign-up and login by an online shopper - the test validates that the online shopper is
     created and is able to login to the application */
  it("should sign-up and log in as the online shopper.", function() {
    return Marketplace.deployed().then(function(instance) {
      marketplaceInstance = instance;

      return marketplaceInstance.signup(onlineShopper1, {from: accounts[3]});
    }).then(function() {
      return marketplaceInstance.login.call({from: accounts[3]});
    }).then(function(userName) {
      assert.equal(web3.utils.toUtf8(userName), 'onlineshopper91', "The online shopper was not signed-up.");
    });
  });

  /* this test is for an online shopper to update his/her name through the profile - the test validates that the online shopper is
     able to update his/her name  */
  it("should be able to change online shopper name.", function() {
    return Marketplace.deployed().then(function(instance) {
      marketplaceInstance = instance;

      return marketplaceInstance.login(onlineShopper1, {from: accounts[3]});
    }).then(function() {
      return marketplaceInstance.update.call(updateOnlineShopper1, {from: accounts[3]});
    }).then(function(userName) {
      assert.equal(web3.utils.toUtf8(userName), 'onlineshopper92', "The online shopper name was not updated.");
    });
  });

  /* this test is for a store owner to add a store fron to the online marketplace - the test validates that the store front
     has been successfully added to the marketplace  */
  it("should be able for store owner to add a store front.", function() {
    return Marketplace.deployed().then(function(instance) {
      marketplaceInstance = instance;

      return marketplaceInstance.login(storeOwner1, {from: accounts[2]});
    }).then(function() {
      return marketplaceInstance.addStoreFront.call(storeFront1, {from: accounts[2]});
    }).then(function(userName) {
      assert.equal(web3.utils.toUtf8(userName), 'storefront91', "The new store front was not created.");
    });
  });
});
