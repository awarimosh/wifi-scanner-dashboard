import React, { Component } from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {
    postRegister
  } from '../actions'
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
      var values = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
      }
      postRegister(values);
      event.preventDefault();
    }
    render() {
        return (
            <div>
                <MuiThemeProvider  muiTheme={muiTheme}>
                    <div>
                        <AppBar
                            title="Register"
                        />
                        <div style={divStyle}>
                            <TextField
                                hintText="Enter your First Name"
                                floatingLabelText="First Name"
                                onChange={(event, newValue) => this.setState({ first_name: newValue })}
                            />
                            <br />
                            <TextField
                                hintText="Enter your Last Name"
                                floatingLabelText="Last Name"
                                onChange={(event, newValue) => this.setState({ last_name: newValue })}
                            />
                            <br />
                            <TextField
                                hintText="Enter your Email"
                                type="email"
                                floatingLabelText="Email"
                                onChange={(event, newValue) => this.setState({ email: newValue })}
                            />
                            <br />
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={(event, newValue) => this.setState({ password: newValue })}
                            />
                            <br />
                            <RaisedButton label="Submit" primary={true} style={buttonStyle} onClick={(event) => this.handleSubmit(event)} />
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const divStyle = {
    margin: 'auto',
    width: '25%',
    padding: '10px'
};

const buttonStyle = {
    position: 'absolute',
    width: '250px',
}
const muiTheme = getMuiTheme({
    palette: {
        primary1Color: deepOrange500
    },
    appBar: {
        height: 50,
    },
});
export default Register;