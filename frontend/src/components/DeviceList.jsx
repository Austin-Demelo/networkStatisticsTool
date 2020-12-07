import {
    Button,
    CircularProgress,
    LinearProgress,
    IconButton,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Snackbar,
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { deleteDevice, getAllDevices } from '../redux/modules/deviceModule'

import DeleteIcon from '@material-ui/icons/Delete'
import DeviceForm from './Forms/DeviceForm'
import EditIcon from '@material-ui/icons/Edit'
import PlayIcon from '@material-ui/icons/PlayArrow'
import React from 'react'
import { Redirect } from 'react-router'
import ViewIcon from '@material-ui/icons/ViewList'
import { connect } from 'react-redux'
import { getAllNetworks } from '../redux/modules/networkModule'
import { runStatsTest } from '../redux/modules/networkStatsModule'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

class DeviceList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            editDevice: undefined,
            redirect: false,
            runningStatTest: false,
            testStatus: false,
            testMsg: '',
            testSeverity: undefined,
        }
        this.selectDevice = this.selectDevice.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onCreateDevice = this.onCreateDevice.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
    }

    async componentDidMount() {
        this.props.getAllNetworks()
        this.props.getAllDevices()
    }



    handleClose() {
        this.setState({
            open: false,
            editDevice: undefined,
        })
    }

    selectDevice(device) {
        this.setState({
            open: true,
            editDevice: device,
        })
    }

    deleteDevice(deviceId) {
        this.props.deleteDevice(deviceId)
    }

    async runStatsTest(deviceId) {
        this.setState({ runningStatTest: true })
        let statsTest = await this.props.runStatsTest(deviceId)
        if (statsTest.TestStatus == 'Success') {
            this.setState({
                runningStatTest: false,
                testStatus: true,
                testMsg: 'Test ran successfully!',
                testSeverity: 'success',
            })
        } else {
            this.setState({   runningStatTest: false,
                testStatus: true,
                testMsg: 'Test failed!',
                testSeverity: 'error', })
        }
    }

    onCreateDevice() {
        this.setState({
            open: true,
            editDevice: undefined,
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return (
                <Redirect
                    to={{
                        pathname: `/networkstats/`,
                        state: { device: this.state.editDevice },
                    }}
                />
            )
        }
    }

    render() {
        return this.props.networkList.length === 0 ||
            !this.props.deviceList.length === 0 ? (
            <CircularProgress></CircularProgress>
        ) : (
            <div>
                {this.renderRedirect()}
                {this.state.runningStatTest && (
                    <div
                        style={{
                            margin: 'auto',
                            width: '20%',
                            padding: '10px',
                        }}
                    >
                        <Alert severity="info">Test is running...</Alert>
                        <div style={{ padding: '5px' }}>
                            <LinearProgress color="secondary"></LinearProgress>
                        </div>
                    </div>
                )}
                {this.state.testStatus && (
                    <div
                        style={{
                            margin: 'auto',
                            width: '20%',
                            padding: '10px',
                        }}
                    >
                            <Alert
                                onClose={this.handleAlertClose}
                                severity={this.state.testSeverity}
                            >
                                {this.state.testMsg}
                            </Alert>
                    </div>
                )}
                <div
                    style={{
                        maxWidth: '500px',
                        margin: 'auto',
                        padding: '10px',
                    }}
                >
                    <TableContainer component={Paper}>
                        <Table
                            className={useStyles.table}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Device Name</TableCell>
                                    <TableCell>Network Id</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.deviceList.map((device) => (
                                    <TableRow key={`${device.Id}tableRow`}>
                                        <TableCell>
                                            {device.DeviceName}
                                        </TableCell>
                                        <TableCell>
                                            {device.NetworkId}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() =>
                                                    this.selectDevice(device)
                                                }
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() =>
                                                    this.deleteDevice(device.Id)
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() =>
                                                    this.setState({
                                                        redirect: true,
                                                        editDevice: device,
                                                    })
                                                }
                                            >
                                                <ViewIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() =>
                                                    this.runStatsTest(device.Id)
                                                }
                                            >
                                                <PlayIcon color="action" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {this.props.networkList.length > 0 && (
                        <div style={{ float: 'right', paddingTop: '20px' }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={this.onCreateDevice}
                            >
                                Add Device
                            </Button>
                        </div>
                    )}
                </div>
                <Modal open={this.state.open} onClose={this.handleClose}>
                    <DeviceForm
                        editDevice={this.state.editDevice}
                        handleClose={this.handleClose}
                    />
                </Modal>
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
        deleteDevice: (deviceId) => dispatch(deleteDevice(deviceId)),
        runStatsTest: (deviceId) => dispatch(runStatsTest(deviceId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList)
