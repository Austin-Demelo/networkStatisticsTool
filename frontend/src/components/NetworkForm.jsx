import { Button, Card, CardContent, TextField } from "@material-ui/core/";

import React from 'react'

export default class NetworkForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: {
                NetworkName: '',
            }
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        console.log(this.props.editNetwork);
        if(!!this.props.editNetwork) {
            this.setState({
                formData: {
                    NetworkName: this.props.editNetwork.NetworkName
                }
            });
        }
    }

    onFormSubmit(e) {
        console.log(this);
    }


    render() {
        return (
            <Card>
                <CardContent>
                    <TextField
                        onChange={(e) => this.setState({formData: {...this.state.formData, NetworkName: e.target.value}})}
                        placeholder="Network Name"
                        autoFocus={true}
                        required
                        value={this.state.formData.NetworkName  || ''}
                        label="Network Name"
                        id="networkName"
                        style = {{display: 'block', width: 300}}
                    />
                    <Button color="primary" onClick={this.onFormSubmit}>
                    {(this.props.editNetwork === undefined ? 'Add' : 'Update')} Network
                    </Button>
                </CardContent>
            </Card>
        )
    }
}

