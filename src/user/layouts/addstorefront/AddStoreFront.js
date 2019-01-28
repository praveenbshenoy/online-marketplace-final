import React, { Component } from 'react'
import AddStoreFrontFormContainer from '../../ui/addstorefrontform/AddStoreFrontFormContainer'

class AddStoreFront extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Add StoreFront</h1>
            <p>Input new unique store front name </p>
            <AddStoreFrontFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default AddStoreFront
