import React, { Component } from 'react'
import AddAdminFormContainer from '../../ui/addadminform/AddAdminFormContainer'

class AddAdmin extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Add Admin</h1>
            <p>Input new Admin name and Admin address </p>
            <AddAdminFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default AddAdmin
