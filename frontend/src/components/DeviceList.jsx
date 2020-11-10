import {Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import { getAllDevices, deleteDevice } from '../redux/modules/deviceModule'
import { getAllNetworks } from '../redux/modules/networkModule'

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DeviceForm from './Forms/DeviceForm'
import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})


class DeviceList extends React.Component {
    constructor(props) {
        super(props)
        console.log(props);
        this.state = {
            open: false,
            editDevice: undefined
        }
        this.selectDevice = this.selectDevice.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onCreateDevice = this.onCreateDevice.bind(this);
    }

    async componentWillMount() {
        this.props.getAllNetworks()
        this.props.getAllDevices()
    }


    handleClose() {
        this.setState({
            open:false,
            editDevice: undefined
          });
      };
  
      selectDevice(device) {
          this.setState({
              open:true,
              editDevice: device
          });
      }
  
      deleteDevice(deviceId) {
          this.props.deleteDevice(deviceId);
      }
  
      onCreateDevice() {
          this.setState({
              open:true,
              editDevice: undefined
          });
      }
  
    render() {
        return (
            <div>
            <div style={{ maxWidth: '500px', padding:"10px" }}>
               
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
                                            onClick={() => this.selectDevice(device)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => this.deleteDevice(device.Id)}
                                            //Foreign Key restraint. Devices point to Network parent.
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{float:'right', paddingTop:'20px'}}>
                    <Button variant="contained" color="primary" onClick={this.onCreateDevice}>
                        Add Device
                    </Button>
                </div>
            </div>
            <Modal
                open={this.state.open}
                onClose={this.handleClose}
            >
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
        networkList: state.networks.networks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllNetworks: () => dispatch(getAllNetworks()),
        getAllDevices: () => dispatch(getAllDevices()),
        deleteDevice: (deviceId) => dispatch(deleteDevice(deviceId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList)
