import React, { Component } from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

export default class Sensors extends Component {
  render() {
    const rows = this.props.sensors.map((_, i) => (
      <TableRow key={i}>
        <TableColumn>{_.deviceID}</TableColumn>
        <TableColumn>{_.deviceName}</TableColumn>
        <TableColumn>{_.zoneID}</TableColumn>
        <TableColumn>{_.deviceDescription}</TableColumn>
        <TableColumn>{_.deviceLocation}</TableColumn>
      </TableRow>
    ));

    return (
      <div className="md-grid">
        <DataTable plain>
          <TableHeader>
            <TableRow>
              <TableColumn>ID</TableColumn>
              <TableColumn>Name</TableColumn>
              <TableColumn>Zone</TableColumn>
              <TableColumn>Description</TableColumn>
              <TableColumn>Location</TableColumn>
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