pragma solidity ^0.5.0;

/// @author Praveen B Shenoy
/// @title Marketplace - setting up an online marketplace

import './zeppelin/lifecycle/Killable.sol';

contract Marketplace is Killable {

   /* set owner */
   address private owner;

   /* variable to handle emergencies, and impose circuit breakers */
   bool private emergency;

   /* stores user id temporarily */
   uint private id;

   /* capture all users */
   mapping (address => User) private users;

   /* capture group of admins */
   mapping (address => bool) public isAdmin; // allow contracts to see if user is an Admin
   uint public adminCount;  // stores a running count of the admins

   /* capture store owners */
   mapping (address => bool) public isStoreOwner; // allow contracts to see if user is a store owner
   uint public storeOwnerCount; // stores a running count of store owners
   //mapping (address => uint) public storeOwnerId;

   /* capture online shoppers */
   mapping (address => bool) public isOnlineShopper; // allow contracts to see if user is an online shoppers
   uint public onlineShopperCount; // stores a running count of online shoppers
   //mapping (address => User) private onlineShoppers;

   /* capture store fronts */
   mapping (uint => StoreFront) public storeFronts; // all store fronts
   mapping (address => StoreFront[]) public filteredStoreFronts; // all store fronts for a particular store owner
   mapping (bytes32 => bool) public isExistingStoreFront; // allow contracts to check if store front name is unique
   uint public storeFrontCount; // stores a running count of the store fronts created
   bytes32[] allStoreFronts; // an array of all store front names
   //mapping (uint => StoreFront[]) public allStoreFronts;
   //mapping (address => uint) public storeFrontId;

   /* capture store products */
   mapping (uint => Product) public products; // all products
   mapping (address => mapping (uint => Product[])) public storeOwnerStoreFrontProducts; // mapping of owner to store front to products
   mapping (uint => Product[]) public storeFrontProducts; //mapping of store front to products
   uint public productCount; // running count of all products

   /* structure pertaining to a User */
   struct User {
      bytes32 name; // user name
      bytes32 userRole; // user role can be admin, store owner or online shopper
   }

   /* structure pertaining to a store front */
   struct StoreFront {
      uint storeFrontNumber; // a unique number assigned to each store front
      bytes32 storeFrontName; // store front name
      address storeOwner; // address of the store owner
   }

   /* structure pertaining to a product */
   struct Product {
      uint productNumber;  // a unique number assigned to each product
      bytes32 productName; // product name
      uint quantity;       // product quantity currnetly available in the store
      uint unitPrice;      // unit price (selling price) of the product
      uint storeFrontNumber; // store front number of the store where the product belongs
      address storeOwner;  // address of the store owner
   }

   /* events */
   event AdminAdded(address indexed admin);  // emitted each time a new admin is added
   event StoreOwnerAdded(address indexed storeOwner); // emitted each time a new store owner is added
   event OnlineShopperAdded(address indexed onlineShopper); // emitted each time a new online shopper signs-up
   event StoreFrontAdded(uint indexed storeFrontNumber,
                         bytes32 indexed storeFrontName,
                         address indexed storeOwner); // emitted each time a new store front is created
   event StoreFrontProductAdded(uint indexed productNumber,
                                bytes32 productName,
                                uint quantity,
                                uint unitPrice,
                                uint indexed storeFrontNumber,
                                address indexed storeOwner); // emitted each time a new product is added
   event LogEmergencyStatus(bool emergencyStatus); // emitted each time emergency is set or released for circuit breaker

   /* modifiers */

   /* check there is no emergency currently */
   modifier noEmergency() {
      require(!(emergency));
      _;
   }

   /* check input name is not blank */
   modifier onlyValidName(bytes32 name) {
      require(!(name == 0x0));
      _;
   }

   /* check input number is greater than or equal to 0 */
   modifier onlyValidNumber(uint number) {
      require(!(number >= 0));
      _;
   }

   /* check if user already exists during login */
   modifier onlyExistingUser(address _entrant) {
      require(!(users[_entrant].name == 0x0));
      _;
   }

   /* check input address is not blank */
   modifier onlyValidAddress(address inputAddress) {
      require(inputAddress != address(0x0));
      _;
   }

   /* check new store front name is not a duplicate */
   modifier onlyValidStoreFront(bytes32 name) {
      require(!(isExistingStoreFront[name]));
      _;
   }

   /* set the owner to the creator of this contract
      owner will also be the default admin */
   constructor() public {
      owner = msg.sender;
      users[msg.sender].name = "Admin";
      users[msg.sender].userRole = "Admin";
      isAdmin[msg.sender] = true;
      adminCount += 1;
      emit AdminAdded(msg.sender);
   }

   /// @notice function to set or release an emergency by setting the emergency flag
   ///         setting the emergency flag stop key business functions performed by store owners or online onlineShoppers
   ///         like adding stores fronts, or making purchases
   ///         Only admins can set or release the emergency flag
   ///@return  emergency flag will be returned with the right status
   function toggleEmergency()
   public
   payable
   returns (bool emergencyStatus) {
      require(isAdmin[msg.sender]);
      emergency = !emergency;
      emit LogEmergencyStatus(emergency);
      return emergency;
   }

   /// @notice check is user exists and return user role
   /// @return the name of the person logged in
   function login() view
   public
   onlyExistingUser(msg.sender)
   returns (bytes32) {
      return (users[msg.sender].name);
   }

   /// @notice sign up as online shopper only:
   ///         check if user exists, if yes, return user name;
   ///         if no, check if name was sent, if yes, create and return user
   /// @param  name of the person signing up
   /// @return the name of the person signed up
   function signup(bytes32 name)
   public
   payable
   onlyValidName(name)
   returns (bytes32) {
      if (users[msg.sender].name == 0x0) {
         users[msg.sender].name = name;
         users[msg.sender].userRole = "OnlineShopper";
         isOnlineShopper[msg.sender] = true;
         onlineShopperCount += 1;
         emit OnlineShopperAdded(msg.sender);
         return (users[msg.sender].name);
      }
      return (users[msg.sender].name);
   }

   /// @notice function to update user name only
   ///         requires new user name is not blank
   ///         requester to be an existing user and can only change his/her name
   /// @param  name to be updated as
   /// @return updated name of the user
   function update(bytes32 name)
   public
   payable
   onlyValidName(name)
   onlyExistingUser(msg.sender)
   returns (bytes32) {
      if (users[msg.sender].name != 0x0) {
         users[msg.sender].name = name;
         return (users[msg.sender].name);
      }
   }

   /// @notice function to set up a new admin
   ///         requires new admin name and address are not blank
   ///         requester needs to be an existing admin
   /// @param  newAdminName newAdminAddress
   /// @return userName of the newly added admin
   function addAdmin(bytes32 newAdminName, address newAdminAddress)
   public
   payable
   onlyValidName(newAdminName)
   onlyValidAddress(newAdminAddress)
   returns(bytes32 userName) {
      if (users[newAdminAddress].name == 0x0) {
         /* only admins should be able to add other admins */
         require(isAdmin[msg.sender]);
         users[newAdminAddress].name = newAdminName;
         users[newAdminAddress].userRole = "Admin";
         isAdmin[newAdminAddress] = true;
         adminCount += 1;
         emit AdminAdded(newAdminAddress);
         return (users[newAdminAddress].name);
      }
      return (users[newAdminAddress].name);
   }

   /// @notice function to set up a new store owner
   ///         requires new store owner name and address are not blank
   ///         requester needs to be an existing admin
   /// @param  newStoreOwner newStoreOwnerAddress
   /// @return userName of the newly added store owner
   function addStoreOwner(bytes32 newStoreOwner, address newStoreOwnerAddress)
   public
   payable
   onlyValidName(newStoreOwner)
   onlyValidAddress (newStoreOwnerAddress)
   returns(bytes32 userName) {
      if (users[newStoreOwnerAddress].name == 0x0) {
         /* only admins should be able to add store owners */
         require(isAdmin[msg.sender]);
         users[newStoreOwnerAddress].name = newStoreOwner;
         users[newStoreOwnerAddress].userRole = "StoreOwner";
         isStoreOwner[newStoreOwnerAddress] = true;
         //storeOwnerId[newStoreOwnerAddress] = storeOwnerCount;
         storeOwnerCount += 1;
         emit StoreOwnerAdded(newStoreOwnerAddress);
         return (users[newStoreOwnerAddress].name);
      }
      return users[newStoreOwnerAddress].name;
   }

   /// @notice function to set up a new store front
   ///         requires new store front name is not blank
   ///         requester needs to be an existing store owner
   /// @param  newStoreFrontName for the store front to be added
   /// @return newStoreFrontName of the newly added store front
   function addStoreFront(bytes32 newStoreFrontName)
   public
   payable
   onlyValidName(newStoreFrontName)
   onlyValidStoreFront(newStoreFrontName)
   noEmergency()
   returns(bytes32 storeFrontName) {
      require(isStoreOwner[msg.sender]);
      storeFronts[storeFrontCount].storeFrontNumber = storeFrontCount;
      storeFronts[storeFrontCount].storeFrontName = newStoreFrontName;
      storeFronts[storeFrontCount].storeOwner = msg.sender;
      filteredStoreFronts[msg.sender].push(storeFronts[storeFrontCount]);
      allStoreFronts.push(newStoreFrontName);
      isExistingStoreFront[newStoreFrontName] = true;
      emit StoreFrontAdded(storeFrontCount, newStoreFrontName, msg.sender);
      storeFrontCount += 1;
      return newStoreFrontName;
   }

   /// @notice function to retrieve store front names of the requester
   /// @return storeFrontNames belonging to the requester
   function getMyStoreFronts()
   public
   view
   returns (bytes32[] memory storeFrontNames) {
      for (uint i=0; i < filteredStoreFronts[msg.sender].length; i++) {
         storeFrontNames[i] = filteredStoreFronts[msg.sender][i].storeFrontName;
      }
      return storeFrontNames;
   }

   /// @notice function to retrieve all available store fronts
   /// @return allStoreFrontNames
   function getAllStoreFronts()
   public
   view
   returns (bytes32[] memory storeFrontNames) {
      return allStoreFronts;
   }

   /// @notice function to add a product to a store front
   ///         requires new product name is not blank; quantity and unit price >= 0
   ///         requester needs to be owner of the store front where the product is being added
   /// @param  storeFrontNumber productName quantity unitPrice
   /// @return storeProductName of the newly added product
   function addStoreProducts(uint storeFrontNumber, bytes32 productName, uint quantity, uint unitPrice)
   public
   payable
   onlyValidName(productName)
   onlyValidNumber(quantity)
   onlyValidNumber(unitPrice)
   noEmergency()
   returns (bytes32 storeProductName) {
      require(storeFronts[storeFrontNumber].storeOwner == msg.sender,"Only store front owners can add products to their store front");
      products[productCount] = Product({
         productNumber: productCount,
         productName: productName,
         quantity: quantity,
         unitPrice: unitPrice,
         storeFrontNumber: storeFrontNumber,
         storeOwner: msg.sender
      });
      storeOwnerStoreFrontProducts[msg.sender][storeFrontNumber].push(products[productCount]);
      storeFrontProducts[storeFrontNumber].push(products[productCount]);
      emit StoreFrontProductAdded(productCount, productName, quantity, unitPrice, storeFrontNumber, msg.sender);
      productCount += 1;
      return productName;
   }

   /// @notice function to retrieve all products in a store front
   /// @param  storeFrontNumber for which products to be retrieved
   /// @return storeFrontProductNames of all products in the store front
   function getStoreFrontProducts(uint storeFrontNumber)
   public
   view
   returns (bytes32[] memory storeFrontProductNames) {
      for (uint i=0; i < storeFrontProducts[storeFrontNumber].length; i++) {
         storeFrontProductNames[i] = storeFrontProducts[storeFrontNumber][i].productName;
      }
      return storeFrontProductNames;
   }
}
