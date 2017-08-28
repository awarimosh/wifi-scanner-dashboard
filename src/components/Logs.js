import React, { Component } from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

export default class Logs extends Component {
  render() {
    const rows = this.props.logs.map((_, i) => (
      <TableRow key={i}>
        <TableColumn>
          {timeConverter(_.dateTime)}
        </TableColumn>
        <TableColumn>{_.sensorid}</TableColumn>
        <TableColumn>
          {_.data.map((x, ii) => (
            <TableRow key={ii}>
              <TableColumn>{x.mac}</TableColumn>
              <TableColumn>{x.rssi}</TableColumn>
            </TableRow>
          ))}
        </TableColumn>
        <TableColumn>
          {
            getSSID(_.ssid)
          }
        </TableColumn>
      </TableRow>
    ));

    function getSSID(data) {
      if (data) {
        return data.map((y, iii) => (
          <TableRow key={iii}>
            <TableColumn>{y.mac}</TableColumn>
            <TableColumn>{y.ssid}</TableColumn>
            <TableColumn>{y.rssi}</TableColumn>
          </TableRow>
        ))
      }
      return null
    }

    function timeConverter(timestamp) {
      const time = new Date(timestamp);
      return time.toLocaleString();
    }

    return (
      <div className="md-grid">
        <DataTable plain>
          <TableHeader>
            <TableRow>
              <TableColumn>Date</TableColumn>
              <TableColumn>Sensor id</TableColumn>
              <TableColumn>Data</TableColumn>
              <TableColumn>SSID</TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows}
          </TableBody>
        </DataTable>
      </div>
    );
  }
}