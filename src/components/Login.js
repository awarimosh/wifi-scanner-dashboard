import React, { Component } from 'react';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Notifications from 'react-notify-toast';
import createHistory from 'history/createBrowserHistory'
import {
  validateLogin
} from '../actions'
const history = createHistory();
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitted: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("redirect") !== undefined && localStorage.getItem("redirect") !== null){
      history.push(localStorage.getItem("redirect"));
      history.push('/logs');
      window.location.replace('/logs')
      window.location.assign('/logs')
      window.location.href = '/logs'
    }
  }

  handleSubmit(event) {
    var values = {
      email: this.state.email,
      password: this.state.password
    }
    this.setState({
      user: validateLogin(values),
      submitted: true
    });
    // event.preventDefault();
  }

  componentDidUpdate(nextProps) {
    if (localStorage.getItem("redirect") !== undefined && localStorage.getItem("redirect") !== null)
      this.props.history.push(localStorage.getItem("redirect"))
    if (this.state.submitted === true) {
      console.log('state', this.state);
      this.setState({
        submitted: false
      });
    }
  }

  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <AppBar
              title="Login"
            />
            <div style={divStyle}>
              <TextField
                type="email"
                hintText="Enter your Email"
                floatingLabelText="Email Address"
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
        <Notifications options={{ zIndex: 5000 }} />
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
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepOrange500
  },
  appBar: {
    height: 50,
  },
});

export default Login;