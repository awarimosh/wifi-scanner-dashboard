import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button, NavigationDrawer } from 'react-md';
import NavLink from '../NavLink';
import configureStore from '../configureStore'
import { Provider } from 'react-redux';

// import Home from './Home';
import LogContainer from './LogContainer';
import SensorsList from './SensorsList';
import MacContainer from './MacContainer';
import Visitors from './Visitors';
import UniqueVisitors from './UniqueVisitors'
import Duration from './Duration'

const store = configureStore();

const navItems =
  [
    //   {
    //   exact: true,
    //   label: 'Home',
    //   to: '/',
    //   icon: 'home',
    // }, 
    {
      label: 'Logs',
      to: '/logs',
      icon: 'history',
    }, {
      label: 'Macs',
      to: '/macs',
      icon: 'fingerprint',
    }, {
      label: 'Locations',
      to: '/locations',
      icon: 'add_location',
    }, {
      label: 'Visitors',
      to: '/visitors',
      icon: 'group',
    }, {
      label: 'Unique Visitors',
      to: '/uniqueVisitors',
      icon: 'person_pin',
    }, {
      label: 'Duration',
      to: '/duration',
      icon: 'av_timer',
    },];

class App extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log('logoff');
    localStorage.clear();
    window.location.reload();
  }

  render() {
    return (
      <Route
        render={({ location }) => (
          <NavigationDrawer
            drawerTitle="Tracker"
            toolbarTitle="Welcome to SureTouch"
            toolbarActions={<Button flat style={{ marginTop: '22px' }} onClick={this.handleClick}>logout</Button>}
            navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
          >
            <Provider store={store}>
              <Switch key={location.key}>
                {/* <Route exact path="/" location={location} component={Home} /> */}
                <Route exact path="/" location={location} component={LogContainer} />
                <Route path="/locations" location={location} component={SensorsList} />
                <Route path="/logs" location={location} component={LogContainer} />
                <Route path="/macs" location={location} component={MacContainer} />
                <Route path="/visitors" location={location} component={Visitors} />
                <Route path="/uniqueVisitors" location={location} component={UniqueVisitors} />
                <Route path="/duration" location={location} component={Duration} />
              </Switch>
            </Provider>
          </NavigationDrawer>
        )}
      />
    );
  }
}

export default App;