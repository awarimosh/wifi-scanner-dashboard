import fetch from 'isomorphic-fetch'

export const REQUEST_LOGS = 'REQUEST_LOGS'
export const RECEIVE_LOGS = 'RECEIVE_LOGS'

export const SELECT_SUBLOGS = 'SELECT_SUBLOGS'
export const INVALIDATE_SUBLOGS = 'INVALIDATE_SUBLOGS'

export const REQUEST_SENSORS = 'REQUEST_SENSORS'
export const RECEIVE_SENSORS = 'RECEIVE_SENSORS'

export const SELECT_SUBURL = 'SELECT_SUBURL'
export const INVALIDATE_SUBURL = 'INVALIDATE_SUBURL'

export const REQUEST_MACS = 'REQUEST_MACS'
export const RECEIVE_MACS = 'RECEIVE_MACS'

export const REQUEST_VISITORS = 'REQUEST_VISITORS'
export const RECEIVE_VISITORS = 'RECEIVE_VISITORS'

export const REQUEST_UNIQUE_VISITORS = 'REQUEST_UNIQUE_VISITORS'
export const RECEIVE_UNIQUE_VISITORS = 'RECEIVE_UNIQUE_VISITORS'

export const REQUEST_DURATION = 'REQUEST_DURATION'
export const RECEIVE_DURATION = 'RECEIVE_DURATION'
// const baseURL = "http://localhost:3030";
const baseURL = "http://128.199.154.60:3030";

function requestSuburl(suburl, type) {
  switch (type) {
    case REQUEST_SENSORS:
      return {
        type: REQUEST_SENSORS,
        suburl
      }
    case REQUEST_MACS:
      return {
        type: REQUEST_MACS,
        suburl
      }
    case REQUEST_LOGS:
      return {
        type: REQUEST_LOGS,
        suburl
      }
    default:
      return {
        type: INVALIDATE_SUBURL,
        suburl
      }
  }
}

export function selectSublog(sublog) {
  return {
    type: SELECT_SUBLOGS,
    sublog
  }
}

export function invalidateSublog(sublog) {
  return {
    type: INVALIDATE_SUBLOGS,
    sublog
  }
}

function receiveLogs(sublog, json) {
  var obj = {
    type: RECEIVE_LOGS,
    sublog,
    logs: json.map(child => child),
    receivedAt: Date.now()
  }
  return obj;
}

function fetchLogs(sublog) {
  return dispatch => {
    dispatch(requestSuburl(sublog, RECEIVE_LOGS))
    return fetch(`${baseURL}/logs/limit/${sublog === "reactjs" ? "5" : sublog}`)
      .then(response => response.json())
      .then(json => dispatch(receiveLogs(sublog, json)))
  }
}

function shouldFetchLogs(state, sublog) {
  const logs = state.postsBySublog[sublog]
  if (!logs) {
    return true
  } else if (logs.isFetching) {
    return false
  } else {
    return logs.didInvalidate
  }
}

export function fetchLogsIfNeeded(sublog) {
  return (dispatch, getState) => {
    if (shouldFetchLogs(getState(), sublog)) {
      return dispatch(fetchLogs(sublog))
    }
  }
}

export function postSensor(payload) {
  fetch(`${baseURL}/sensors/create`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: new Headers({
      "Content-Type": "application/json"
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log('res', res)
    })
    .catch((err) => {
      console.error('Fetch signup ERROR:', err)
    });
}

/////// sensors
export function selectSuburl(suburl) {
  return {
    type: SELECT_SUBURL,
    suburl
  }
}

export function invalidateSuburl(suburl) {
  return {
    type: INVALIDATE_SUBURL,
    suburl
  }
}

function receiveSensors(suburl, json) {
  var obj = {
    type: RECEIVE_SENSORS,
    suburl,
    sensors: json,
    receivedAt: Date.now()
  }
  return obj;
}

function fetchSensors(suburl) {
  return dispatch => {
    dispatch(requestSuburl(suburl, RECEIVE_SENSORS))
    return fetch(`${baseURL}/sensors/sensors`)
      .then(response => response.json())
      .then(json => dispatch(receiveSensors('sensors', json)))
  }
}

function shouldFetchSensors(state, suburl) {
  const sensors = state.postsBySuburl[suburl]
  if (!sensors) {
    return true
  } else if (sensors.isFetching) {
    return false
  } else {
    return sensors.didInvalidate
  }
}

export function fetchSensorsIfNeeded(suburl) {
  suburl = 'sensors'
  return (dispatch, getState) => {
    if (shouldFetchSensors(getState(), suburl)) {
      return dispatch(fetchSensors(suburl))
    }
  }
}

////// macs
function receiveMacs(suburl, json) {
  var obj = {
    type: RECEIVE_MACS,
    suburl,
    macs: json.map(child => child),
    receivedAt: Date.now()
  }
  return obj;
}

function fetchMacs(suburl, value) {
  if (value === undefined) {
    value = {};
    value.sensorID = 2844;
    value.startDate = new Date().setHours(0, 0, 0, 0) / 1000 - 86400;
    value.endDate = Date.now() / 1000 + 86400 + 86400;
  }
  return dispatch => {
    dispatch(requestSuburl(suburl))
    return fetch(`${baseURL}/macs/filter/${value.sensorID}/startDate/${value.startDate}/endDate/${value.endDate}`)
      .then(response => response.json())
      .then(json => dispatch(receiveMacs(suburl, json)))
  }
}

export function fetchMacsIfNeeded(suburl, value) {
  return (dispatch, getState) => {
    // if (shouldFetchMacs(getState(), suburl)) {
    return dispatch(fetchMacs(suburl, value))
    // }
  }
}

////// visitors
function receiveVisitors(suburl, json) {
  var obj = {
    type: RECEIVE_VISITORS,
    suburl,
    visitors: json,
    receivedAt: Date.now()
  }
  return obj;
}

function fetchVisitors(suburl, value) {
  if (value === undefined) {
    value = {};
    value.sensors = 2844;
    value.week = 37;
    value.year = 2017;
  }
  return dispatch => {
    dispatch(requestSuburl(suburl))
    return fetch(`${baseURL}/visitors/?sensors=${value.sensors}&week=${value.week}&year=${value.year}`)
      .then(response => response.json())
      .then(json => dispatch(receiveVisitors(suburl, json.response)))
  }
}

function shouldFetchVisitors(state, suburl) {
  const visitors = state.postsBySuburl[suburl]
  if (!visitors) {
    return true
  } else if (visitors.isFetching) {
    return false
  } else {
    return visitors.didInvalidate
  }
}

export function fetchVisitorsIfNeeded(suburl, value) {
  return (dispatch, getState) => {
    if (shouldFetchVisitors(getState(), suburl)) {
      return dispatch(fetchVisitors(suburl, value))
    }
  }
}

////// unique visitors
function receiveUniqueVisitors(suburl, json) {
  var obj = {
    type: RECEIVE_UNIQUE_VISITORS,
    suburl,
    uniqueVisitors: json,
    receivedAt: Date.now()
  }
  return obj;
}

function fetchUniqueVisitors(suburl, value) {
  if (value === undefined) {
    value = {};
    value.sensors = 2844;
    value.week = 37;
    value.year = 2017;
  }
  return dispatch => {
    dispatch(requestSuburl(suburl))
    return fetch(`${baseURL}/visitors/unique?sensors=${value.sensors}&week=${value.week}&year=${value.year}`)
      .then(response => response.json())
      .then(json => dispatch(receiveUniqueVisitors(suburl, json.response)))
  }
}

function shouldFetchUniqueVisitors(state, suburl) {
  const uniqueVisitors = state.postsBySuburl[suburl]
  if (!uniqueVisitors) {
    return true
  } else if (uniqueVisitors.isFetching) {
    return false
  } else {
    return uniqueVisitors.didInvalidate
  }
}

export function fetchUniqueVisitorsIfNeeded(suburl, value) {
  return (dispatch, getState) => {
    if (shouldFetchUniqueVisitors(getState(), suburl)) {
      return dispatch(fetchUniqueVisitors(suburl, value))
    }
  }
}

////// Duration
function receiveDuration(suburl, json) {
  var obj = {
    type: RECEIVE_DURATION,
    suburl,
    duration: json,
    receivedAt: Date.now()
  }
  return obj;
}

function fetchDuration(suburl, value) {
  if (value === undefined) {
    value = {};
    value.sensors = 2844;
    value.week = 37;
    value.year = 2017;
  }
  return dispatch => {
    dispatch(requestSuburl(suburl))
    return fetch(`${baseURL}/duration/?sensors=${value.sensors}&week=${value.week}&year=${value.year}`)
      .then(response => response.json())
      .then(json => dispatch(receiveDuration(suburl, json.response)))
  }
}

function shouldFetchDuration(state, suburl) {
  const duration = state.postsBySuburl[suburl]
  if (!duration) {
    return true
  } else if (duration.isFetching) {
    return false
  } else {
    return duration.didInvalidate
  }
}

export function fetchDurationIfNeeded(suburl, value) {
  return (dispatch, getState) => {
    if (shouldFetchDuration(getState(), suburl)) {
      return dispatch(fetchDuration(suburl, value))
    }
  }
}