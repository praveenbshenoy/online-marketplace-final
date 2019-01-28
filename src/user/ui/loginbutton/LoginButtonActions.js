import MarketplaceContract from '../../../../build/contracts/Marketplace.json'
import { browserHistory } from 'react-router'
import store from '../../../store'

const contract = require('truffle-contract')

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function loginUser() {
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

          //var adminCount = marketplaceInstance.adminCount()
          // Attempt to login user.
          marketplaceInstance.login({from: coinbase})
          .then(function(result) {
            // If no error, login user.
            var userName = web3.toUtf8(result)
            //var adminCount = marketplaceInstance.adminCount()
            //var storeOwnerCount = marketplaceInstance.storeOwnerCount()
            //var onlineShopperCount = marketplaceInstance.onlineShopperCount()

            dispatch(userLoggedIn({"name": userName}))

            // Used a manual redirect here as opposed to a wrapper.
            // This way, once logged in a user can still access the home page.
            var currentLocation = browserHistory.getCurrentLocation()

            if ('redirect' in currentLocation.query)
            {
              return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
            }

// Praveen 25Jan
            marketplace.StoreFrontAdded({from: coinbase}).watch((error,result) => console.info(result))
//            if (userName === 'Admin')
//                return browserHistory.push('/AdminDashboard')
//            else
//            if (userName === 'StoreOwner')
//                return browserHistory.push('/StoreOwnerDashboard')
//            else
//            if (userName === 'OnlineShopper')
//                return browserHistory.pusj('/OnlineShopperDashboard')
//            else
                return browserHistory.push('/dashboard')
// Praveen 25Jan            return browserHistory.push('/dashboard')
          })
          .catch(function(result) {
            // If error, go to signup page.
            console.error('Wallet ' + coinbase + ' does not have an account!')

            return browserHistory.push('/signup')
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
