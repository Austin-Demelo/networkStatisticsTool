import React from 'react'
import { connect } from 'react-redux'
import { getAllDevices } from '../redux/modules/deviceModule'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import NetworkForm from './NetworkForm'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'

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
        }
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    async componentWillMount() {
        this.props.getAllDevices()
    }

    handleOpen() {
        console.log(this)
        this.setState({ open: true })
    }


    handleClose() {
        this.setState({ open: false })
    }

    render() {
        return (
            <div>
                <div style={{maxWidth:'500px'}}>
                    <TableContainer component={Paper}>
                        <Table
                            className={useStyles.table}
                            aria-label="simple table"
                        >
                          <TableHead>
                                <TableRow>
                                    <TableCell>Device Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.deviceList.map((row) => (
                                     <TableRow key={row.Id}>
                                        <TableCell>{row.DeviceName}</TableCell>
                                 </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
          
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        deviceList: state.devices.devices,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllDevices: () => dispatch(getAllDevices()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList)
