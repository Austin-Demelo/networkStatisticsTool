import React from 'react'
import { connect } from 'react-redux'
import { validateUser } from '../redux/modules/userModule';

class ActivateAccount extends React.Component {
    constructor(props) {
        super(props)
        console.log(props);
        this.state = {
            key: props.match.params.key,
            user: undefined,
            validated: false
        }
    }
    componentDidMount() {
        this.props.validateUser(this.state.key)
        .then((user) => {
            this.setState({
                user: user
            },
            (state) => {

            }
            );
        })
    }
    render() {
        return (
            <div>
                {!this.state.user 
                ?
                    <div>This is an invalid activation link or the account has already been activated</div>
                :
                    
                <div> 
                    <div>{this.state.user.username}! Your account has been activated. You can now login.</div>
                </div>
                }
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
        validateUser: (key) => dispatch(validateUser(key)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
)(ActivateAccount)
