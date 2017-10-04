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
import Visitors from './Visitors';
import UniqueVisitors from './UniqueVisitors'

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
},{
  label: 'Macs',
  to: '/macs',
  icon: 'fingerprint',
},{
  label: 'Locations',
  to: '/locations',
  icon: 'add_location',
},{
  label: 'Visitors',
  to: '/visitors',
  icon: 'group',
},{
  label: 'Unique Visitors',
  to: '/uniqueVisitors',
  icon: 'group',
},  ];

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
                <Route path="/locations" location={location} component={SensorsList} />
                <Route path="/logs" location={location} component={LogContainer} />
                <Route path="/macs" location={location} component={MacContainer} />
                <Route path="/visitors" location={location} component={Visitors} />
                <Route path="/uniqueVisitors" location={location} component={UniqueVisitors} />
              </Switch>
            </Provider>
          </NavigationDrawer>
        )}
      />
    );
  }
}

export default App;