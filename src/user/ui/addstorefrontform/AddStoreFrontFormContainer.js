import { connect } from 'react-redux'
import AddStoreFrontForm from './AddStoreFrontForm'
import { addStoreFrontUser } from './AddStoreFrontFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddStoreFrontFormSubmit: (name) => {
      dispatch(addStoreFrontUser(name))
    }
  }
}

const AddStoreFrontFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStoreFrontForm)

export default AddStoreFrontFormContainer
