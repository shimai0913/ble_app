import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../firebase';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: 'name', label: 'User Name', minWidth: 100 },
    { id: 'device', label: 'Device', minWidth: 100 },
    { id: 'id', label: '( ID )', minWidth: 100 },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

function StickyHeadTable(props) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { devices } = props;
    const [doc_list, setDoclist] = useState([]);
    let device_id_list = []
    let device_name_list = []
    let doc_data_list = []

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // const devices_map = async () => {

    // }
    // const make_doc_data_list = (device_id_list) => {

    // }

    useEffect(() => {
        if (devices.length > 0) {
            devices.map(device => {
                device_id_list.push(device.id)
                device_name_list.push(device.name)
            })



            device_id_list.map(device_id => {
                try {
                    db.collection("ble_info").doc(device_id).get()
                        .then((doc) => {
                            if (doc.exists) {
                                console.log("Document data:", doc.data());
                                doc_data_list.push(doc.data());
                                setDoclist(doc_data_list)
                            } else {
                                console.log(device_id, "No such document!");
                            }
                        })
                } catch {
                }
            })

            setDoclist(doc_data_list)
        }
    }, [devices]);




    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {doc_list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
                                    <TableCell>{data.name}</TableCell>
                                    <TableCell>{data.device ? data.device : '不明'}</TableCell>
                                    <TableCell>{data.id}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={devices.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}


export default StickyHeadTable;
