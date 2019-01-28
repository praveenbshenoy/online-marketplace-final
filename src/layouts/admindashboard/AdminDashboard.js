import React, { Component } from 'react'

class AdminDashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1> Admin Dashboard</h1>
            <p><strong>Congratulations {this.props.authData.name}!</strong> AdminCount: {this.props.adminCount}. If you're seeing this page, you've logged in with your own smart contract successfully.</p>
          </div>
        </div>
      </main>
    )
  }
}

export default AdminDashboard
