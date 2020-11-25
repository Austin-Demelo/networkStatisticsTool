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
    TextField,
} from '@material-ui/core'
import { deleteNetwork, getAllNetworks } from '../redux/modules/networkModule'
import {getAllProblems, deleteProblem} from '../redux/modules/problemModule'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import NetworkForm from './Forms/NetworkForm'
import React from 'react'
import { connect } from 'react-redux'
import { createProblem } from '../redux/modules/problemModule'
import { getAllDevices } from '../redux/modules/deviceModule'
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
            listOfProblems: ['Lag', 'Latency', 'More Problems go here'],
            problem: {}, //should be of type IProblem,
            problemDescription: '',
            problemType: '',
            deviceId: 0,
            open: false,
            editNetwork: undefined,
        }

        this.selectNetwork = this.selectNetwork.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onCreateNetwork = this.onCreateNetwork.bind(this)
        this.onCreateProblem = this.onCreateProblem.bind(this)
    }

    async componentDidMount() {
        this.props.getAllNetworks();
        this.props.getAllDevices();
        this.props.getAllProblems();
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


    deleteProblem(problemId) {
        this.props.deleteProblem(problemId);
    }
   

    onCreateNetwork() {
        this.setState({
            open: true,
            editNetwork: undefined,
        })
    }

    onCreateProblem(problem) {
        console.log(problem)
        this.setState({
            //nullify the problem object
            problem: undefined,
        })
    }

    render() {
        return (
            <div>
                <div
                    style={{
                        maxWidth: '600px',
                        margin: 'auto',
                        padding: '10px',
                    }}
                >
                    <div style={{ paddingBottom: '30px' }}>
                        <Card>
                            <CardContent>
                                Device:
                                <FormControl
                                    style={{ display: 'block', width: 300 }}
                                >
                                    <Select
                                        style={{ width: 200 }}
                                        onChange={(e) =>
                                            this.setState({
                                                deviceId: e.target.value.Id,
                                            })
                                        }
                                    >
                                        {this.props.deviceList.map((device) => (
                                            <MenuItem value={device}>
                                                {device.DeviceName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </CardContent>

                            <CardContent>
                                Problem Type:
                                <FormControl
                                    style={{ display: 'block', width: 300 }}
                                >
                                    <Select
                                        style={{ width: 200 }}
                                        onChange={(e) =>
                                            this.setState({
                                                problemType: e.target.value,
                                            })
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>Other</em>
                                        </MenuItem>
                                        {this.state.listOfProblems.map(
                                            (problemType) => (
                                                <MenuItem value={problemType}>
                                                    {problemType}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                </FormControl>
                            </CardContent>

                            <CardContent>
                                Description of Problem:
                                <TextField
                                    onChange={(e) =>
                                        this.setState({
                                            problemDescription: e.target.value,
                                        })
                                    }
                                    // placeholder="Network Name"
                                    // autoFocus={true} //Needed on the first field of each form
                                    // value={this.state.formData.NetworkName  || ''}
                                    // error={!!this.state.formValidation.NetworkName}
                                    // helperText={this.state.formValidation.NetworkName || ''}
                                    // label="Network Name"
                                    style={{ display: 'block', width: 300 }}
                                />
                            </CardContent>
                            <div style={{ padding: '10px', float: 'right' }}>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    onClick={() =>
                                        this.props.createProblem({
                                            problemType: this.state.problemType,
                                            problemDescription: this.state
                                                .problemDescription,
                                            deviceId: this.state.deviceId,
                                        })
                                    }
                                >
                                    Report Issue
                                </Button>
                            </div>
                        </Card>
                    </div>
                    <TableContainer component={Paper}>
                        <Table
                            className={useStyles.table}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>User</TableCell>
                                    <TableCell>Device</TableCell>
                                    <TableCell>Problem Type</TableCell>
                                    <TableCell>Problem Description</TableCell>
                                    <TableCell>Time Reported</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.problemList.map((network) => (
                                    <TableRow key={`${network.Id}tableRow`}>
                                        <TableCell>
                                            coming soon to a table near
                                        </TableCell>
                                        <TableCell>

                                            {/* {network.DeviceId} */}
                                            {this.props.deviceList.map(device => {if(device.NetworkId === network.DeviceId){return device.DeviceName}else{return network.DeviceId}})}
                                            {/* {network.DeviceId?.map((d) => `${d.DeviceName} `)} */}

                                        </TableCell>
                                       
                                        <TableCell>
                                            {network.ProblemType}
                                        </TableCell>
                                        <TableCell>
                                            {network.ProblemDescription}
                                        </TableCell>
                                        <TableCell>
                                            {/* {new Intl.DateTimeFormat("en-GB", {year: "numeric", month: "long", day: "2-digit"}).format(network.TimeProblemOccurred)}*/}
                                            {network.TimeProblemOccurred}

                                        </TableCell> 
                                        <TableCell>
                                            
                                            <IconButton
                                                onClick={() => this.deleteProblem(network.Id)}
                                                //Foreign Key restraint. Devices point to Network parent.
                                             >
                                                <DoneIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
        deviceList: state.devices.devices,
        problemList: state.problems.problems,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllNetworks: () => dispatch(getAllNetworks()),
        getAllDevices: () => dispatch(getAllDevices()),
        deleteProblem: (problemId) => dispatch(deleteProblem(problemId)),
        getAllProblems: () => dispatch(getAllProblems()),
        createProblem: (problem) => dispatch(createProblem(problem)),

        createProblem: (problem) => dispatch(createProblem(problem)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkProblems)
