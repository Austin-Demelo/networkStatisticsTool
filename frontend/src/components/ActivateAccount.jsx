import React from 'react'
import { connect } from 'react-redux'
import { getUserByActivationKey } from '../redux/modules/userModule';

class ActivateAccount extends React.Component {
    constructor(props) {
        super(props)
        console.log(props);
        this.state = {
            key: props.match.params.key,
            user: undefined
        }
    }
    componentDidMount() {
        console.log(this.state.key)
        this.props.getUserByActivationKey(this.state.key)
        .then((user) => {
            this.setState({
                user: user
            });
        })
    }
    render() {
        return (
            <div>{JSON.stringify(this.state.key)}
                {JSON.stringify(this.state.user)}
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
        getUserByActivationKey: (key) => dispatch(getUserByActivationKey(key)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
)(ActivateAccount)
