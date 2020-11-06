import React from 'react'
import { connect } from 'react-redux'
import { getAllNetworks } from '../redux/modules/networkModule'
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

const ModalStyle = makeStyles((theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

class NetworkList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            networks: [],
            open: false,
        }
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.rand = this.rand.bind(this);
    }

    async componentWillMount() {
        this.props.getAllNetworks()
    }

    handleOpen() {
        console.log(this)
        this.setState({ open: true })
    }

    rand() {
      return Math.round(Math.random() * 20) - 10;
    }


    handleClose() {
        this.setState({ open: false })
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.networkList.map((row) => (
                                    <TableRow key={row.Id}>
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
                    <Button variant="contained" color="primary" onClick={this.handleOpen}>
                       Open Modal
                    </Button>
                    <Modal
                    className={ModalStyle.paper}
                        open={this.state.open}
                        onClose={this.handleClose}
                    >
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
