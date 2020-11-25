import {
    Button,
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
import { deleteNetwork, getAllNetworks } from '../redux/modules/networkModule'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import NetworkForm from './Forms/NetworkForm'
import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})

class NetworkList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            networks: [],
            open: false,
            editNetwork: undefined,
        }

        this.selectNetwork = this.selectNetwork.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onCreateNetwork = this.onCreateNetwork.bind(this)
    }

    async componentWillMount() {
        this.props.getAllNetworks()
    }

    handleClose() {
        this.setState({
            open: false,
            editNetwork: undefined,
        })
    }

    selectNetwork(network) {
        this.setState({
            open: true,
            editNetwork: network,
        })
    }

    deleteNetwork(networkId) {
        this.props.deleteNetwork(networkId)
    }

    onCreateNetwork() {
        this.setState({
            open: true,
            editNetwork: undefined,
        })
    }

    render() {
        return (
            <div>
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
                                    <TableCell>Network Name</TableCell>
                                    <TableCell>Devices</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.networkList.map((network) => (
                                    <TableRow key={`${network.Id}tableRow`}>
                                        <TableCell>
                                            {network.NetworkName}
                                        </TableCell>
                                        <TableCell>
                                            {network.Devices?.map(
                                                (d) => `${d} `
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() =>
                                                    this.selectNetwork(network)
                                                }
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() =>
                                                    this.deleteNetwork(
                                                        network.Id
                                                    )
                                                }
                                                //Foreign Key restraint. Devices point to Network parent.
                                                disabled={
                                                    !!!network.Devices ||
                                                    network.Devices.length !== 0
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{ float: 'right', paddingTop: '20px' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.onCreateNetwork}
                        >
                            Add Network
                        </Button>
                    </div>
                </div>
                <Modal open={this.state.open} onClose={this.handleClose}>
                    <NetworkForm
                        editNetwork={this.state.editNetwork}
                        handleClose={this.handleClose}
                    />
                </Modal>
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
        deleteNetwork: (networkId) => dispatch(deleteNetwork(networkId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkList)
