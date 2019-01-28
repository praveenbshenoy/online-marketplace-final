import { connect } from 'react-redux'
import AddAdminForm from './AddAdminForm'
import { addAdminUser } from './AddAdminFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddAdminFormSubmit: (name, adminAddress) => {
      dispatch(addAdminUser(name, adminAddress))
    }
  }
}

const AddAdminFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAdminForm)

export default AddAdminFormContainer
