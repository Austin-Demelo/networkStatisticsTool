import {
    Button,
    CircularProgress,
    IconButton,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core'
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

class DeviceList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            editDevice: undefined,
            redirect: false,
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

    async runStatsTest(deviceId){
        alert("Speed Test Running...")
        let statsTest = await this.props.runStatsTest(deviceId)
        if(statsTest.TestStatus == "Success"){
            alert(`Speed Test completed successfully\n
             Download Speed: ${statsTest.DownloadSpeedInMegabitsPerSecond} MiB/s
             Upload Speed: ${statsTest.UploadSpeedInMegabitsPerSecond} MiB/s
             Packet Loss: ${statsTest.PacketLoss}%
             Latency: ${statsTest.Latency}% `)
        }
        else{
            alert("Speed Test failed")
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
                <div
                    style={{
                        maxWidth: '500px',
                        margin: 'auto',
                        padding: '10px'
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
                                                <PlayIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {this.props.networkList.length > 0 &&
                        <div style={{ float: 'right', paddingTop: '20px' }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={this.onCreateDevice}
                            >
                                Add Device
                            </Button>
                        </div>
                    }
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
        runStatsTest: (deviceId) => dispatch(runStatsTest(deviceId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList)
