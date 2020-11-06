import React from 'react'
import { connect } from 'react-redux'
import { getAllNetworks } from '../redux/modules/networkModule'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import NetworkForm from './NetworkForm'
import Modal from '@material-ui/core/Modal'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})

export class NetworkList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            networks: [],
            open: false,
        }
    }

    async componentWillMount() {
        this.props.getAllNetworks()
    }

    handleOpen() {
      this.setState({open:true})
    };
    handleClose() {
      this.setState({open:false})
    };


    render() {
        return (
            <div>
                <div style={{ maxWidth: '500px' }}>
                    <TableContainer component={Paper}>
                        <Table
                            className={useStyles.table}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>NetworkName</TableCell>
                                    <TableCell>Devices</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.networkList.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.NetworkName}</TableCell>
                                        <TableCell>
                                            {row.Devices.map((d) => `${d} `)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div>
                    <button type="button" onClick={this.handleOpen}>
                        Open Modal
                    </button>
                    <Modal
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <NetworkForm />
                    </Modal>
                </div>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkList)
