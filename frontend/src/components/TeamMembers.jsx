import {Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import { deleteUser, getAllUsers } from '../redux/modules/userModule'

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react'
import UserForm from './UserForm'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})

class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            open: false,
            editUser: undefined
        }

        this.selectUser = this.selectUser.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onCreateUser = this.onCreateUser.bind(this);

    }

    async componentWillMount() {
        this.props.getAllUsers()
    }


    handleClose() {
      this.setState({
          open:false,
          editUser: undefined
        });
    };

    selectUser(user) {
        this.setState({
            open:true,
            editUser: user
        });
    }

    deleteUser(userId) {
        this.props.deleteUser(userId);
    }

    onCreateUser() {
        this.setState({
            open:true,
            editUser: undefined
        });
    }


    render() {
        return (
            <div>
                <div style={{ maxWidth: '500px' }}>
                    <Button style = {{float: 'right'}} color="primary" onClick={this.onCreateUser}>
                            Add User
                    </Button>
                    <TableContainer component={Paper}>
                        
                        <Table
                            className={useStyles.table}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>User</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.userList.map((user) => (
                                    <TableRow key={`${user.Id}tableRow`}>
                                        <TableCell>
                                            {user.UserName}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() => this.selectUser(user)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => this.deleteUser(user.Id)}
                                                //Foreign Key restraint. Devices point to User parent.
                                                // disabled={!!!user.Devices || user.Devices.length !== 0}
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
                    <UserForm 
                        editUser={this.state.editUser}
                        handleClose={this.handleClose}
                    />
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userList: state.users.users,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllUsers: () => dispatch(getAllUsers()),
        deleteUser: (userId) => dispatch(deleteUser(userId)),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
