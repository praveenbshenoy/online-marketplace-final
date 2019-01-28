DESIGN PATTERN DECISIONS
========================

As part of this project to build the infrastructure for an online marketplace
I looked into several design patterns to identify applicability in the business
scenarios.

Some of the design patterns I looked into are listed below -
1. Contract Self-destruction
2. Mapping Iterator
3. Factory Contract
4. Withdrawal Pattern
5. Name Registry
6. Circuit breakers
7. Fail Early, Fail Loud

Given that the currently functionality implemented in the project circled
around setting up an infrastructure for online marketplace, the following
design patterns were most relevant and have been implemented across the
functions in the contract.

1. Mapping iterator design pattern: As setting up the infrastructure for
an online marketplace involves creating new admins, new store owners, new
store fronts, new products - as the number of entities grow, it becomes
difficult to identify and manage duplicates. However by appropriately using
mapping, several rounds of expensive iterations have been avoided.

This pattern is spread across the contract in marketplace.sol.
a. Checking if admin/storeowner/onlineshopper already exists prior to adding
   a new one, the following statement design patterns in the code quickly check
   for existing users without having to iterate thru all users  

   if (users[newAdminAddress].name == 0x0) // to check for existence of admins
   if (users[newStoreOwnerAddress].name == 0x0) // to check for store owners
   if (users[msg.sender].name == 0x0)  // to check for existing online shoppers

b. Similarly to avoid duplicate store front names, a mapping iterator design
   pattern was to avoid iterations

   require(!(isExistingStoreFront[name]));   

2. Contract self-destruction: This would be a necessary factor to include in
   design as online businesses can get acquired / merged / or out of business.
   Depending on the business situations it could very well require that the
   underlying smart contracts also exit the blockchain in a planned way rather
   that be active which poses a risk if the contract functions continue to get
   used by other contracts and/or accounts.

   For this reason, the Marketplace.sol contract is designed as killable and it
   only be self-destructed by the owner of the contract.

   contract Marketplace is Killable // by definition

   contract Killable does have the selfdestruct definition by the owner

3. Withdrawal pattern: This is a very beneficial design pattern that would be
   highly relevant for contracts that are involved in business transactions
   between accounts with exchange of value. At present, the scope of the
   current marketplace project is only to setup the infrastructure -
   transaction processing will be a future phase when online shoppers will be
   using the online marketplace to makes purchases and payments & refunds will
   be made to store vendors.

   Withdrawal pattern will be incorporated into the design once the scope of
   marketplace functionality is expanded to start including transactions.

4. Circuit Breaker: The functionality implemented in the marketplace does have
   a circuit breaker design pattern included through a emergency flag. The
   emergency flag is set by the admin only if a business or a system issue
   warrants it.

   Once the emergency is invoked, then all key business functions done via the
   smart contract will be stopped. Modifiers are in place across the key
   functions like addStoreFront or addProduct that will execute only if there
   is no emergency flag set.

   All future functions in the contract will also include the circuit breaker
   design pattern to stop execution in case of an emergency.

5. Fail early, fail loud: Plenty of modifiers and require statements are
   used in all functions to trap all possible errors that come into play.
   Including fail managemement features right from the beginning will
   progressively build a more robust code and minimizes chances of bugs as well
   as helps in fixing bugs.

6. Factory contract and Name Registry has not been applicable right now, as I am
   dealing with a single contract scenarion. But this will definitely be in
   consideration when multiple contracts come into play and there is heavy
   interactions and dependencies between these contracts.
