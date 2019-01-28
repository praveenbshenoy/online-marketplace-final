 Avoiding common attaks isvery important in ensuring that the contracts do not
 fll trap to malicious actors who by design or unitentioanlly tend to cause.

 Following are some of the common attacks and some of the mitigations that the
 app handles.

 1. Denial of Service attack: This is often caused by users supplying the
 contract with external data that is too expensive to process, or by
 repeatedly interacting with the contract in a bid to prevent others from
 accessing the contract.

 As mitigations:
 a. The design limits the information the external entities can provide to the
 contract. Usage of bytes32 instead of string, limits the length of data that
 would go as inouts to the contract. By avoiding string datatype, large volumes
 of data arriving from a single interaction or mutiple simialr interactions can
 be avoided.
 b. Also by using mapping iterator design pattern, looping has been avoided to a
 great extend in user exposed functions thereby minmizing chances of expensive,
 gas-consuming runaway processes.
 c. Further planning to set limits on certain functionality like number of store
 fronts created by a store vendor on any particular day. In that way, a hacker
 cannot take over a store owner's account and flood the marketplace with
 spam storefronts thereby preventing access to legitimate valid store fronts.

 2. Poison data: Contracts like the marketplace has several forms that accepts
 user input data. Any garbage data entered thru these forms can cause
 unintended errors or fatalities in downstream functions casuing the
 application to crash.

 As mitigations:
 a. Kept key user inputs functions like adding additional admins or store front
 owners to admins only. In this manner, new admins and store owners and the
 related data is vetted properly before they enter the system.
 b. Data entered by store owners and online shoppers are kept the the minimum -
 only names in byte32 fields so they cannot go beyond the limits.
 c. Before the data is pushed into storage, the smart contarcts have logic to
 check for blanks, duplicates, invalids like negative pricing or negative
 quantiity that can harm downstream transactions.

 3. Malaicious Intent: Various users interect with the marketplace contract in
 varying capacities - admin, store owner or online shopper. Any one user who has
 autheorized access to one or more functions can exploit the same to cause
 damage to the application - intentionally or unintentionally.

 As mitigations:
 a. Clearly define what each role does and only limit functions to the needs of
 the role. No role has access beyond what is needed. For example, admin can only
 add other admins or store owners but do not have access to add storefronts or
 products
 b. The user process and the user interactions with the system - both inputs and
 outputs is clearly defined and incoporated into the design. Use data available
 in system as much as possible rather than let users make redundant inputs.
 c. Have checks and balances in plac within the application for all scenarios
 that could result in the contract executing on a faulty path. For example,
 ensuring users cannot enter negative pricing or negative quantity.
