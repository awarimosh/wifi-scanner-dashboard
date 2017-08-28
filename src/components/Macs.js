import React, { Component } from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

export default class Macs extends Component {
    render() {        
        const rows = this.props.macs.map((_, i) => (
            <TableRow key={i}>
                <TableColumn>
                    {timeConverter(_.timestamp)}
                </TableColumn>
                <TableColumn>
                    {timeConverter(_.createdAt)}
                </TableColumn>
                <TableColumn>{_.sensorID}</TableColumn>
                <TableColumn>{_.mac}</TableColumn>
                <TableColumn>{_.rssi}</TableColumn>
            </TableRow>
        ));

        function timeConverter(timestamp) {
            if(timestamp === undefined || timestamp.length > 0){
                return "Date Unavailable"
            }
            const time = new Date(timestamp * 1000);
            return time.toLocaleString();
        }

        return (
            <div className="md-grid">
                <DataTable plain >
                    <TableHeader>
                        <TableRow>
                            <TableColumn>Updatetd At</TableColumn>
                            <TableColumn>Created At</TableColumn>
                            <TableColumn>Sensor id</TableColumn>
                            <TableColumn>Mac Address</TableColumn>
                            <TableColumn>Strength</TableColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody >
                        {rows}
                    </TableBody>
                </DataTable>
            </div>
        );
    }
}