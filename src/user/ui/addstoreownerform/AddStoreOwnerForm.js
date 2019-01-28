import React, { Component } from 'react'

class AddStoreOwnerForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      storeOwnerAddress: ''
    }
  }

  onInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2)
    {
      return alert('Please fill in the store owner name.')
    }

    if (this.state.storeOwnerAddress.length < 2)
    {
      return alert('Please fill in the store owner account address.')
    }

    this.props.onAddStoreOwnerFormSubmit(this.state.name, this.state.storeOwnerAddress)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" value={this.state.name} onChange={this.onInputChange.bind(this)} placeholder="Name" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <label htmlFor="storeOwnerAddress">Address</label>
          <input id="storeOwnerAddress" type="text" name="storeOwnerAddress" value={this.state.storeOwnerAddress} onChange={this.onInputChange.bind(this)} placeholder="Address" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <button type="submit" className="pure-button pure-button-primary">Add Store Owner</button>
        </fieldset>
      </form>
    )
  }
}

export default AddStoreOwnerForm
