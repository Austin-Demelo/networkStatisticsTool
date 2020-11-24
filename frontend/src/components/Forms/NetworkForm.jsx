import { Button, Card, CardContent, TextField } from '@material-ui/core/'
import {
    createNetwork,
    getAllNetworks,
    updateNetwork,
} from '../../redux/modules/networkModule'

import React from 'react'
import { connect } from 'react-redux'

class NetworkForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: {
                NetworkName: '',
            },
            //Through validateFields(), will populate field value (Ex NetworkName) from formData, with error message string
            //EX fromValidation: { NetworkName: 'This field is required' }
            //Used in Field Component's properties *error* and *helperText*
            //EX error={!!this.state.formValidation.NetworkName} - BOOLEAN
            //EX helperText={this.state.formValidation.NetworkName || ''} - STRING
            formValidation: {},
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        if (this.props.editNetwork) {
            this.setState({
                //Load form data, from parent property *editNetwork* from NetworkList
                formData: {
                    NetworkName: this.props.editNetwork.NetworkName,
                },
            })
        }
    }
    validateFields() {
        let updatedValidation = {} //Initialize empty validation object
        Object.keys(this.state.formData).forEach((field) => {
            const value = this.state.formData[field]
            switch (field) {
                case 'NetworkName':
                    if (!value) {
                        updatedValidation[field] = 'This field is required'
                    }
                    break
                default:
                // code block
            }
        })
        this.setState({
            formValidation: updatedValidation,
        })
    }

    async onFormSubmit(e) {
        let network = { ...this.state.formData }
        await this.validateFields()
        if (!Object.keys(this.state.formValidation).length) {
            if (this.props.editNetwork) {
                //Update the Network
                network.Id = this.props.editNetwork.Id
                network.Timer = this.props.editNetwork.Timer
                this.props.updateNetwork(network).then((network) => {
                    this.props.handleClose() //Passed as argument from NetworkList
                })
            } else {
                //Add the Network
                this.props.createNetwork(network).then((network) => {
                    this.props.handleClose() //Passed as argument from NetworkList
                })
            }
        }
    }

    render() {
        return (
            <div
                style={{
                    maxWidth: '500px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '85vh',
                    minWidth: '100vw',
                }}
            >
                <Card>
                    <CardContent>
                        <TextField
                            onChange={(e) =>
                                this.setState({
                                    formData: {
                                        ...this.state.formData,
                                        NetworkName: e.target.value,
                                    },
                                })
                            }
                            placeholder="Network Name"
                            autoFocus={true} //Needed on the first field of each form
                            value={this.state.formData.NetworkName || ''}
                            error={!!this.state.formValidation.NetworkName}
                            helperText={
                                this.state.formValidation.NetworkName || ''
                            }
                            label="Network Name"
                            style={{ display: 'block', width: 300 }}
                        />
                        <Button color="primary" onClick={this.onFormSubmit}>
                            {this.props.editNetwork === undefined
                                ? 'Add'
                                : 'Update'}{' '}
                            Network
                        </Button>
                    </CardContent>
                </Card>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
})(NetworkForm)
