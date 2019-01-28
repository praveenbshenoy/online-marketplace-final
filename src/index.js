import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import getWeb3 from './util/web3/getWeb3'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Dashboard from './layouts/dashboard/Dashboard'
//import AdminDashboard from './layouts/admindashboard/AdminDashboard'
//import OnlineShopperDashboard from './layouts/onlineshopperdashboard/OnlineShopperDashboard'
//import StoreOwnerDashboard from './layouts/storeownerdashboard/StoreOwnerDashboard'
import SignUp from './user/layouts/signup/SignUp'
import Profile from './user/layouts/profile/Profile'
import AddAdmin from './user/layouts/addadmin/AddAdmin'
import AddStoreOwner from './user/layouts/addstoreowner/AddStoreOwner'
import AddStoreFront from './user/layouts/addstorefront/AddStoreFront'

// Redux Store
import store from './store'

// contract
//import MarketplaceContract from '../../../../build/contracts/Marketplace.json'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!')
})
.catch(() => {
  console.log('Error in web3 initialization.')
})

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
          <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="addadmin" component={UserIsAuthenticated(AddAdmin)} />
          <Route path="addstoreowner" component={UserIsAuthenticated(AddStoreOwner)} />
          <Route path="addstorefront" component={UserIsAuthenticated(AddStoreFront)} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
