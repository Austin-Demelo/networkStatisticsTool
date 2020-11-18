import React from 'react'
import { connect } from 'react-redux'

class ActivateAccount extends React.Component {
    constructor(props) {
        super(props)
        console.log(props);
        this.state = {
            key: props.match.params.key,
            user: undefined
        }
    }
  
    render() {
        return (
            <div>{this.state.key}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
)(ActivateAccount)
