import {IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'

import EditIcon from '@material-ui/icons/Edit';
import NetworkForm from './NetworkForm'
import React from 'react'
import { connect } from 'react-redux'
import { getAllNetworks } from '../redux/modules/networkModule'
import { makeStyles } from '@material-ui/core/styles'

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
            editNetwork: undefined
        }

        this.selectNetwork = this.selectNetwork.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    async componentWillMount() {
        this.props.getAllNetworks()
    }


    handleClose() {
      this.setState({
          open:false,
          editNetwork: undefined
        })
    };

    selectNetwork(network) {
        this.setState({
            open:true,
            editNetwork: network
          })
    }


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
                                            {network.Devices.map((d) => `${d} `)}
                                        </TableCell>
                                        <TableCell>
                                        <IconButton
                                            edge="start"
                                            color="inherit"
                                            aria-label="open drawer"
                                            onClick={() => this.selectNetwork(network)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div>
                    <Modal
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <NetworkForm 
                            editNetwork={this.state.editNetwork}
                        />
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
