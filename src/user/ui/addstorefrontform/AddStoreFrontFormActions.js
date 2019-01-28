import MarketplaceContract from '../../../../build/contracts/Marketplace.json'
// import { loginUser } from '../loginbutton/LoginButtonActions'
//import { browserHistory } from 'react-router'
import store from '../../../store'

const contract = require('truffle-contract')

export function addStoreFrontUser(name) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the marketplace object.
      const marketplace = contract(MarketplaceContract)
      marketplace.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Marketplace.
      var marketplaceInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        marketplace.deployed().then(function(instance) {
          marketplaceInstance = instance

          // Attempt to add new store owner.
          marketplaceInstance.addStoreFront(name, {from: coinbase})
          .then(function(result) {
//            var eve = instance.print({from: coinbase},{fromBlock: 0, toBlock: "latest"})
//            var myStores = eve.addStoreFront();myStores[myStores.length - 1].args
//            console.log(myStores[myStores.length - 1].args.store);
            // If no error, then display success alert

//            marketplace.StoreFrontAdded({from: coinbase}).watch((error,result) => console.info(result))
//            myStoresEvent.watch((error, result) => console.info(result.args.storeFrontName))
//            myStoresEvent.watch(function(error, result) {
//              if (!error)
//                 {
//                     console.log(result);
//                 }
//              else {
//                     console.log(error);
//                 }
//            })
            return alert('New store front successfully added')

            //return browserHistory.push('/dashboard')
//            marketplaceInstance.getMyStoreFronts({from: coinbase})
//            .then(function(result) {
//              return alert('My store fronts retrieved')
//
//            })
//            .catch(function(result) {
//              return alert('My store fronts could not be retrieved')
//            })
          })
          .catch(function(result) {
            // If error...
            return alert('New store front addition failed')
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
