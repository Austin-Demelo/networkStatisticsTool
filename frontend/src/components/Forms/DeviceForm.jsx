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
                UserId: '',
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
                console.log(device)
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
                        <FormControl className={useStyles().formControl}>
                            <InputLabel id="demo-simple-select-helper-label">
                                Age
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {this.props.networkList.map((network) => (
                                    <MenuItem value={network.Id}>
                                        {network.NetworkName}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>
                                Some important helper text
                            </FormHelperText>
                        </FormControl>

                        <Button color="primary" onClick={this.onFormSubmit}>
                            {this.props.editDevice === undefined
                                ? 'Add'
                                : 'Update'}{' '}
                            Device
                        </Button>
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
