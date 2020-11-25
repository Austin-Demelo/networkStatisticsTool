import {
    Button,
    Card,
    CardContent,
    FormControl,
    IconButton,
    MenuItem,
    Modal,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@material-ui/core'
import { deleteNetwork, getAllNetworks } from '../redux/modules/networkModule'

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NetworkForm from './Forms/NetworkForm'
import React from 'react';
import { connect } from 'react-redux'
import {createProblem} from '../redux/modules/problemModule';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})
//if user is logged in as an admin display error list, else if user is logged in as a regular user allow them to report an issue
class NetworkProblems extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            networks: [],
            listOfProblems: ["Lag", "Latency", "More Problems go here"],
            problem: [], //should be of type IProblem
            open: false,
            editNetwork: undefined
        }

        this.selectNetwork = this.selectNetwork.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onCreateNetwork = this.onCreateNetwork.bind(this);
        this.onCreateProblem = this.onCreateProblem.bind(this);
    }

    async componentWillMount() {
        this.props.getAllNetworks()
    }


    handleClose() {
      this.setState({
          open:false,
          editNetwork: undefined
        });
    };

    selectNetwork(network) {
        this.setState({
            open:true,
            editNetwork: network
        });
    }

    deleteNetwork(networkId) {
        this.props.deleteNetwork(networkId);
    }

    onCreateNetwork() {
        this.setState({
            open:true,
            editNetwork: undefined
        });
    }

    onCreateProblem(problem){
        console.log(problem);
        this.setState({
            //nullify the problem object
            problem: undefined
        })
    }


    render() {
        return (
            <div>
                <div style={{ maxWidth: '500px' }}>
                     <Card>
                        <CardContent>
                            Problem Type: 
                            <FormControl  style = {{display: 'block', width: 300}}>
                                <Select style= {{width: 200}}>
                                    <MenuItem value="">
                                        <em>Other</em>
                                    </MenuItem>
                                    {this.state.listOfProblems.map((problemType) => (
                                        <MenuItem value={problemType}>
                                        {problemType}
                                       
                                        </MenuItem>
                                    ))} 
                                </Select>
                             </FormControl>
                        </CardContent>
                        <CardContent>
                            
                            Description of Problem: 
                            <TextField
                                 //onChange={(e) => this.setState({formData: {...this.state.formData, NetworkName: e.target.value}})}
                                // placeholder="Network Name"
                                // autoFocus={true} //Needed on the first field of each form
                                // value={this.state.formData.NetworkName  || ''}
                                // error={!!this.state.formValidation.NetworkName}
                                // helperText={this.state.formValidation.NetworkName || ''}
                                // label="Network Name"
                                 style = {{display: 'block', width: 300}}
                            />
                            
                            </CardContent>
                            <Button color="primary" >
                                Report Issue
                             </Button>
                    </Card>
                    <br/>
                    <br/>
                    <br/>
                    <TableContainer component={Paper}>
                        
                        <Table
                            className={useStyles.table}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>User</TableCell>
                                    <TableCell>Device</TableCell>
                                    <TableCell>Problem Description</TableCell>
                                    <TableCell>Time Reported</TableCell>
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
                                            {network.Devices?.map((d) => `${d} `)}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() => this.selectNetwork(network)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => this.deleteNetwork(network.Id)}
                                                //Foreign Key restraint. Devices point to Network parent.
                                                disabled={!!!network.Devices || network.Devices.length !== 0}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                >
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
        
        createProblem: (problem) => dispatch(createProblem(problem)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkProblems)
