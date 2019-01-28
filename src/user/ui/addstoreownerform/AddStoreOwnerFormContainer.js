import { connect } from 'react-redux'
import AddStoreOwnerForm from './AddStoreOwnerForm'
import { addStoreOwnerUser } from './AddStoreOwnerFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddStoreOwnerFormSubmit: (name, storeOwnerAddress) => {
      dispatch(addStoreOwnerUser(name, storeOwnerAddress))
    }
  }
}

const AddStoreOwnerFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStoreOwnerForm)

export default AddStoreOwnerFormContainer
