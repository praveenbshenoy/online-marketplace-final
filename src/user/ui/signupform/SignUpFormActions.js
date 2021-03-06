import MarketplaceContract from '../../../../build/contracts/Marketplace.json'
import { loginUser } from '../loginbutton/LoginButtonActions'
import store from '../../../store'

const contract = require('truffle-contract')

export function signUpUser(name) {
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

          // Attempt to sign up user.
          marketplaceInstance.signup(name, {from: coinbase})
          .then(function(result) {
            // If no error, login user.
            return dispatch(loginUser())
          })
          .catch(function(result) {
            // If error...
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
