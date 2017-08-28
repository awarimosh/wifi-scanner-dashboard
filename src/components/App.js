import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import NavLink from '../NavLink';
import configureStore from '../configureStore'
import { Provider } from 'react-redux';


import Home from './Home';
import LogContainer from './LogContainer';
import SensorsList from './SensorsList';
import MacContainer from './MacContainer';

const store = configureStore();

const navItems = 
[{
  exact: true,
  label: 'Home',
  to: '/',
  icon: 'home',
}, {
  label: 'Logs',
  to: '/logs',
  icon: 'history',
}, {
  label: 'Sensors',
  to: '/sensors',
  icon: 'settings_remote',
}, {
  label: 'Macs',
  to: '/macs',
  icon: 'fingerprint',
}];

class App extends Component {
  render() {
    return (
      <Route
        render={({ location }) => (
          <NavigationDrawer
            drawerTitle="Tracker"
            toolbarTitle="Welcome to SureTouch"
            navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
          >
            <Provider store={store}>
              <Switch key={location.key}>
                <Route exact path="/" location={location} component={Home} />
                <Route path="/sensors" location={location} component={SensorsList} />
                <Route path="/logs" location={location} component={LogContainer} />
                <Route path="/macs" location={location} component={MacContainer} />
              </Switch>
            </Provider>
          </NavigationDrawer>
        )}
      />
    );
  }
}

export default App;