import React, { Component } from 'react'
import AddStoreOwnerFormContainer from '../../ui/addstoreownerform/AddStoreOwnerFormContainer'

class AddStoreOwner extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Add StoreOwner</h1>
            <p>Input new store owner name and store owner address </p>
            <AddStoreOwnerFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default AddStoreOwner
