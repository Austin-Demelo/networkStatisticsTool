import { Button, Card, CardContent, TextField } from '@material-ui/core/'
import {
    createDevice,
    getAllDevices,
    updateDevice,
} from '../../redux/modules/deviceModule'
import { getAllNetworks } from '../../redux/modules/networkModule'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import React from 'react'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}))

class DeviceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: {
                DeviceName: '',
                NetworkId: undefined,
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

    async componentDidMount() {
        if (this.props.editDevice) {
            this.setState({
                //Load form data, from parent property *editNetwork* from NetworkList
                formData: {
                    DeviceName: this.props.editDevice.DeviceName,
                    NetworkId: this.props.editDevice.NetworkId
                },
            })
        }
        this.props.getAllNetworks()
    }
    validateFields() {
        let updatedValidation = {} //Initialize empty validation object
        Object.keys(this.state.formData).forEach((field) => {
            const value = this.state.formData[field]
            switch (field) {
                case 'DeviceName':
                    if (!value) {
                        updatedValidation[field] = 'This field is required'
                    }
                case 'NetworkId':
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
        let device = { ...this.state.formData }
        await this.validateFields()
        if (!Object.keys(this.state.formValidation).length) {
            if (this.props.editDevice) {
                //Update the Network
                device.Id = this.props.editDevice.Id;
                device.Timer = this.props.editDevice.Timer;
                this.props
                    .updateDevice(device)
                    .then((device) => {
                        this.props.handleClose() //Passed as argument from NetworkList
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                //Add the Network
                this.props.createDevice(device).then((device) => {
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
                        <div>
                            <TextField
                                onChange={(e) =>
                                    this.setState({
                                        formData: {
                                            ...this.state.formData,
                                            DeviceName: e.target.value,
                                        },
                                    })
                                }
                                placeholder="Device Name"
                                autoFocus={true} //Needed on the first field of each form
                                value={this.state.formData.DeviceName || ''}
                                error={!!this.state.formValidation.DeviceName}
                                helperText={
                                    this.state.formValidation.DeviceName || ''
                                }
                                label="Device Name"
                                style={{ display: 'block', width: 300 }}
                            />
                            <FormControl>
                                <InputLabel>Network</InputLabel>
                                <Select onChange={(e) =>
                                    this.setState({
                                        formData: {
                                            ...this.state.formData,
                                            NetworkId: e.target.value
                                        },
                                    })}>
                                    {this.props.networkList.map((network) => (
                                        <MenuItem value={network.Id}>
                                            {network.NetworkName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <Button color="primary" onClick={this.onFormSubmit}>
                                {this.props.editDevice === undefined
                                    ? 'Add'
                                    : 'Update'}{' '}
                                Device
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        deviceList: state.devices.devices,
        networkList: state.networks.networks,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllNetworks: () => dispatch(getAllNetworks()),
        getAllDevices: () => dispatch(getAllDevices()),
        createDevice: (device) => dispatch(createDevice(device)),
        updateDevice: (device) => dispatch(updateDevice(device)),
    }
}
// Must have {forwardRef: true} if passing args from parent
export default connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
})(DeviceForm)
