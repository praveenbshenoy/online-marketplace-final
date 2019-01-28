import React, { Component } from 'react'

class AddAdminForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      adminAddress: ''
    }
  }

  onInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2)
    {
      return alert('Please fill in the Admin name.')
    }

    if (this.state.adminAddress.length < 2)
    {
      return alert('Please fill in the Admin account address.')
    }

    this.props.onAddAdminFormSubmit(this.state.name, this.state.adminAddress)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" value={this.state.name} onChange={this.onInputChange.bind(this)} placeholder="Name" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <label htmlFor="adminAddress">Address</label>
          <input id="adminAddress" type="text" name="adminAddress" value={this.state.adminAddress} onChange={this.onInputChange.bind(this)} placeholder="Address" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <button type="submit" className="pure-button pure-button-primary">Add Admin</button>
        </fieldset>
      </form>
    )
  }
}

export default AddAdminForm
