import { Button, Card, CardContent, IconButton, Input, InputAdornment, TextField } from "@material-ui/core/";
import { createUser, getAllUsers, updateUser } from '../redux/modules/userModule'

import React from 'react'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { connect } from 'react-redux'

class UserForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: {
                UserName: '',
                UserPass: '',
                showPassword: 'password',
            },
            //Through validateFields(), will populate field value (Ex UserName) from formData, with error message string
            //EX fromValidation: { UserName: 'This field is required' }
            //Used in Field Component's properties *error* and *helperText*
            //EX error={!!this.state.formValidation.UserName} - BOOLEAN
            //EX helperText={this.state.formValidation.UserName || ''} - STRING
            formValidation: { } 
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        if(this.props.editUser) {
            this.setState({
                //Load form data, from parent property *editUser* from UserList
                formData: {
                    UserName: this.props.editUser.UserName
                }
            });
        }
    }
    validateFields() {
        let updatedValidation = {}; //Initialize empty validation object
        Object.keys(this.state.formData)
        .forEach((field) => {
            const value = this.state.formData[field];
            switch(field) {
                case 'UserName':
                  if(!value) {
                    updatedValidation[field] = "This field is required"
                  }
                  break;
                default:
                  // code block
            }
            
        });
        this.setState({
            formValidation: updatedValidation
        });
    }

    async onFormSubmit(e) {
        let user = {...this.state.formData};
        await this.validateFields();
        if(!Object.keys(this.state.formValidation).length) {
            if(this.props.editUser) {
                //Update the User
                user.Id = this.props.editUser.Id;
                user.UserName = this.props.editUser.UserName;
                user.RoleId = this.props.editUser.RoleId;
                this.props.updateUser(user)
                .then((user) => {
                    this.props.handleClose(); //Passed as argument from UserList
                });
            }
            else {
                //Add the User
                this.props.createUser(user)
                .then((user) => {
                    this.props.handleClose(); //Passed as argument from UserList
                });
            }
        }
       
    }


    render() {
        return (
            <Card>
                <CardContent>
                    <TextField
                        onChange={(e) => this.setState({formData: {...this.state.formData, UserName: e.target.value}})}
                        placeholder="User Name"
                        autoFocus={true} //Needed on the first field of each form
                        value={this.state.formData.UserName  || ''}
                        error={!!this.state.formValidation.UserName}
                        helperText={this.state.formValidation.UserName || ''}
                        label="User Name"
                        style = {{display: 'block', width: 300}}
                    />
                    <TextField
                        onChange={(e) => this.setState({formData: {...this.state.formData, UserPass: e.target.value}})}
                        placeholder="Password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.formData.UserPass  || ''}
                        error={!!this.state.formValidation.UserPass}
                        helperText={this.state.formValidation.UserPass || ''}
                        label="Password"
                        style = {{display: 'block', width: 300}}
                    />
                    <Button color="primary" onClick={this.onFormSubmit}>
                        {(this.props.editUser === undefined ? 'Register' : 'Save')}
                    </Button>
                </CardContent>
            </Card>
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
        createUser: (user) => dispatch(createUser(user)),
        updateUser: (user) => dispatch(updateUser(user)),
    }
}
// Must have {forwardRef: true} if passing args from parent
export default connect(
        mapStateToProps, 
        mapDispatchToProps, 
        null, 
        {forwardRef: true}
    )(UserForm)


