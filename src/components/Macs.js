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
                    {getUnique(_.unique)}
                </TableColumn>
                <TableColumn>
                    {getTime(_.timestamp, _.createdAt)}
                </TableColumn>
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
            if (timestamp === undefined || timestamp.length > 0) {
                return "Date Unavailable : " + timestamp
            }
            const time = new Date(timestamp * 1000);
            return time.toLocaleString();
        }
        function getTime(time2, time1) {
            var x = time2 - time1;
            var seconds = x % 60;
            seconds = seconds.toFixed();
            seconds = seconds.length > 1 ? seconds : "0" + seconds;
            x /= 60;
            var minutes = x % 60;
            minutes = minutes.toFixed();
            minutes = minutes.length > 1 ? minutes : "0" + minutes;
            x /= 60;
            var hours = x % 24;
            hours = hours.toFixed();
            hours = hours.length > 1 ? hours : "0" + hours;
            if (time1 === time2) {
                return "00 : 00 : 01"
            }
            else {
                return hours + " : " + minutes + " : " + seconds
            }
        }
        function getUnique(val) {
            if (val == null || val.length === 0) {
                return "null"
            }
            else if (val === true) {
                return "true"
            }
            else if (val === false) {
                return "false"
            }
        }
        return (
            <div className="md-grid">
                <DataTable plain >
                    <TableHeader>
                        <TableRow>
                            <TableColumn>Unique</TableColumn>
                            <TableColumn>Duration</TableColumn>
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