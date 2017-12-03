import { combineReducers } from 'redux'
import {
  SELECT_SUBLOGS,
  INVALIDATE_SUBLOGS,
  INVALIDATE_SUBURL,
  REQUEST_LOGS,
  RECEIVE_LOGS,
  REQUEST_SENSORS,
  RECEIVE_SENSORS,
  REQUEST_MACS,
  RECEIVE_MACS,
  REQUEST_VISITORS,
  RECEIVE_VISITORS,
  REQUEST_UNIQUE_VISITORS,
  RECEIVE_UNIQUE_VISITORS,
  REQUEST_DURATION,
  RECEIVE_DURATION,
  RECEIVE_USER,
  REQUEST_CHART_DATA,
  RECEIVE_CHART_DATA,
  SELECT_SUBURL
} from './actions'

function selectedSublog(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBLOGS:
      return action.sublog
    default:
      return state
  }
}

function selectedSuburl(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBURL:
      return action.suburl
    case REQUEST_SENSORS:
      action.suburl = "sensors";
      return action.suburl
    case RECEIVE_SENSORS:
      action.suburl = "sensors";
      return action.suburl
    case REQUEST_MACS:
      action.suburl = "macs";
      return action.suburl
    case RECEIVE_MACS:
      action.suburl = "macs";
      return action.suburl
    case REQUEST_VISITORS:
      action.suburl = "visitors";
      return action.suburl
    case RECEIVE_VISITORS:
      action.suburl = "visitors";
      return action.suburl
    case REQUEST_UNIQUE_VISITORS:
      action.suburl = "visitors/unique";
      return action.suburl
    case RECEIVE_UNIQUE_VISITORS:
      action.suburl = "visitors/unique";
      return action.suburl
    case REQUEST_DURATION:
      action.suburl = "duration";
      return action.suburl
    case RECEIVE_DURATION:
      action.suburl = "duration";
      return action.suburl      
    case RECEIVE_USER:
      action.suburl = "user";
      return action.suburl
    case REQUEST_CHART_DATA:
      action.suburl = "hourChart";
      return action.suburl
    case RECEIVE_CHART_DATA:
      action.suburl = "hourChart";
      return action.suburl
    default:
      return state
  }
}

function logs(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_SUBLOGS:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_LOGS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_LOGS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.logs,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}


function sensors(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_SUBURL:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_SENSORS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_SENSORS:
      var obj = Object.assign(state, {
        isFetching: false,
        didInvalidate: false,
        items: action.sensors,
        lastUpdated: action.receivedAt
      })
      return obj
    default:
      return state
  }
}

function data(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  var obj;
  switch (action.type) {
    case INVALIDATE_SUBURL:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_MACS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_MACS:
      obj = Object.assign(state, {
        isFetching: false,
        didInvalidate: false,
        items: action.macs,
        lastUpdated: action.receivedAt
      })
      return obj
    case REQUEST_VISITORS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_VISITORS:
      obj = Object.assign(state, {
        isFetching: false,
        didInvalidate: false,
        items: action.visitors,
        week: action.week,
        lastUpdated: action.receivedAt
      })
      return obj
    case REQUEST_UNIQUE_VISITORS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_UNIQUE_VISITORS:
      obj = Object.assign(state, {
        isFetching: false,
        didInvalidate: false,
        items: action.uniqueVisitors,
        lastUpdated: action.receivedAt
      })
      return obj
    case REQUEST_DURATION:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_DURATION:
      obj = Object.assign(state, {
        isFetching: false,
        didInvalidate: false,
        items: action.duration,
        lastUpdated: action.receivedAt
      })
      return obj
    case RECEIVE_USER:
      obj = Object.assign(state, {
        isFetching: false,
        didInvalidate: false,
        items: action.user,
        lastUpdated: action.receivedAt
      })
      return obj
    case RECEIVE_CHART_DATA:
      obj = Object.assign(state, {
        isFetching: false,
        didInvalidate: false,
        items: action.chartData,
        lastUpdated: action.receivedAt
      })
      return obj
    default:
      return state
  }
}

function postsBySublog(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBLOGS:
    case RECEIVE_LOGS:
    case REQUEST_LOGS:
      return Object.assign({}, state, {
        [action.sublog]: logs(state[action.sublog], action)
      })
    default:
      return state
  }
}

function postsBySuburl(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBURL:
      if (state[action.suburl] !== undefined && !state[action.suburl].didInvalidate) {
        state[action.suburl].didInvalidate = true;
        return state;
      } else {
        return state;
      }
    case REQUEST_SENSORS:
    case RECEIVE_SENSORS:
      return Object.assign({}, state, {
        [action.suburl]: sensors(state[action.suburl], action)
      })
    case REQUEST_MACS:
    case RECEIVE_MACS:
      return Object.assign({}, state, {
        [action.suburl]: data(state[action.suburl], action)
      })
    case REQUEST_VISITORS:
    case RECEIVE_VISITORS:
      return Object.assign({}, state, {
        [action.suburl]: data(state[action.suburl], action)
      })
    case REQUEST_UNIQUE_VISITORS:
    case RECEIVE_UNIQUE_VISITORS:
      return Object.assign({}, state, {
        [action.suburl]: data(state[action.suburl], action)
      })
    case REQUEST_DURATION:
    case RECEIVE_DURATION:
      return Object.assign({}, state, {
        [action.suburl]: data(state[action.suburl], action)
      })
    case RECEIVE_USER:
      return Object.assign({}, state, {
        [action.suburl]: data(state[action.suburl], action)
      })
    case REQUEST_CHART_DATA:
    case RECEIVE_CHART_DATA:
      return Object.assign({}, state, {
        [action.suburl]: data(state[action.suburl], action)
      })
    default:
      return state
  }
}


const rootReducer = combineReducers({
  postsBySublog,
  postsBySuburl,
  selectedSuburl,
  selectedSublog
})

export default rootReducer