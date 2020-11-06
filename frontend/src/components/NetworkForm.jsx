import { Button, Card, CardContent, TextField } from "@material-ui/core/";
import { createNetwork, getAllNetworks, updateNetwork } from '../redux/modules/networkModule'

import React from 'react'
import { connect } from 'react-redux'

class NetworkForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: {
                NetworkName: '',
            }
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        if(this.props.editNetwork) {
            this.setState({
                formData: {
                    NetworkName: this.props.editNetwork.NetworkName
                }
            });
        }
    }

    onFormSubmit(e) {
        let network = {...this.state.formData};
        if(this.props.editNetwork) {
            //Update the Network
            network.Id = this.props.editNetwork.Id;
            network.Timer = this.props.editNetwork.Timer;
            this.props.updateNetwork(network)
            .then((network) => {
                this.props.getAllNetworks()
                .then(() => {
                    this.props.handleClose(); //Passed as argument from NetworkList
                })
            });
        }
        else {
            //Add the Network
            this.props.createNetwork(network);
        }
    }


    render() {
        return (
            <Card>
                <CardContent>
                    <TextField
                        onChange={(e) => this.setState({formData: {...this.state.formData, NetworkName: e.target.value}})}
                        placeholder="Network Name"
                        autoFocus={true}
                        required
                        value={this.state.formData.NetworkName  || ''}
                        label="Network Name"
                        id="networkName"
                        style = {{display: 'block', width: 300}}
                    />
                    <Button color="primary" onClick={this.onFormSubmit}>
                        {(this.props.editNetwork === undefined ? 'Add' : 'Update')} Network
                    </Button>
                </CardContent>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        networkList: state.networks.networks,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllNetworks: () => dispatch(getAllNetworks()),
        createNetwork: (network) => dispatch(createNetwork(network)),
        updateNetwork: (network) => dispatch(updateNetwork(network)),
    }
}
// Must have {forwardRef: true} if passing args from parent
export default connect(
        mapStateToProps, 
        mapDispatchToProps, 
        null, 
        {forwardRef: true}
    )(NetworkForm)


