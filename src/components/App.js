import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button, NavigationDrawer, DialogContainer } from 'react-md';
import NavLink from '../NavLink';
import configureStore from '../configureStore'
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory'

// import Home from './Home';
import LogContainer from './LogContainer';
import SensorsList from './SensorsList';
import MacContainer from './MacContainer';
import Visitors from './Visitors';
import UniqueVisitors from './UniqueVisitors'
import Duration from './Duration'
import Login from './Login'
import Register from './Register'
import Dashboard from './Chart'

const history = createHistory();
const store = configureStore();

var navItems =
  [
    //   {
    //   exact: true,
    //   label: 'Home',
    //   to: '/',
    //   icon: 'home',
    // }, 
    {
      exact: true,
      label: 'Dashboard',
      to: '/',
      icon: 'show_chart',
    },
    {
      label: 'Locations',
      to: '/locations',
      icon: 'add_location',
    }, {
      label: 'Customers',
      to: '/visitors',
      icon: 'group',
    }, {
      label: 'New Cutomers',
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
    console.log('window : ' + window.location.pathname, window.location.hostname);
    console.log('history : ' + history.location.pathname);
    if (window.location.pathname.includes("register") || window.location.pathname.includes("login")
      || history.location.pathname.includes("register") || history.location.pathname.includes("login")) {
      this.state = {
        visible: false,
        renderNode: null
      }
    } else {
      this.state = {
        visible: true,
        renderNode: null
      }
    }
  }

  handleClick(e) {
    console.log('logoff');
    localStorage.clear();
    history.push('/login');
    history.replace('/login');
    window.location.reload();
  }

  render() {
    const { visible, renderNode } = this.state;
    return (
      <Route
        render={({ location }) => (
          <div>
            <DialogContainer
              id="navigation-drawer-demo"
              aria-label="Navigation Drawer Demo"
              visible={visible}
              fullPage
              focusOnMount={false}
              onShow={this.handleShow}
              onHide={this.hide}
            >
              <NavigationDrawer
                renderNode={renderNode}
                drawerTitle="Tracker"
                toolbarTitle="Welcome to SureTouch"
                toolbarActions={<Button flat style={{ marginTop: '22px' }} onClick={this.handleClick}>logout</Button>}
                navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
              >
                <Provider store={store}>
                  <Switch key={location.key}>
                    <Route exact path="/" location={location} component={Dashboard} />
                    <Route path="/locations" location={location} component={SensorsList} />
                    <Route path="/logs" location={location} component={LogContainer} />
                    <Route path="/macs" location={location} component={MacContainer} />
                    <Route path="/visitors" location={location} component={Visitors} />
                    <Route path="/uniqueVisitors" location={location} component={UniqueVisitors} />
                    <Route path="/duration" location={location} component={Duration} />
                    <Route path="/charts" location={location} component={Dashboard} />
                  </Switch>
                </Provider>
              </NavigationDrawer>
            </DialogContainer>
            {!visible && <Switch key={location.key}>
              <Route path="/login" location={location} component={Login} />
              <Route path="/register" location={location} component={Register} />
            </Switch>}
          </div>
        )}
      />
    );
  }
}

export default App;