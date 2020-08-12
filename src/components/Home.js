import React, { useState } from 'react';
import { Button } from '@material-ui/core';

import { db } from '../firebase';

// import InteractiveList from './Devices_list';
import StickyHeadTable from './ItemTable';
// import FormDialog from './Dialog';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function Home() {

    const all_option = { acceptAllDevices: true };
    const [open, setOpen] = useState(false);
    const [devices, setDevices] = useState([]);
    const [device_id, setDevice_id] = useState(null);
    const [userName_value, setUserName_value] = useState('');
    const [deviceName_value, setDeviceName_value] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const connect = () => {
        navigator.bluetooth.requestDevice(all_option)
            .then(device => {
                return device.gatt.connect();
            })
            .then((server) => {
                if (server.connected) {
                    setDevice_id(server.device.id)
                    setOpen(true);
                }
            })
            .catch(error => console.error(error));
    }

    const handleSubmit = () => {
        console.log(device_id, userName_value, deviceName_value)
        db.collection("ble_info").doc(device_id).set({
            id: device_id,
            name: userName_value,
            device: deviceName_value
        }).then((docRef) => {
            alert('OK')
        }).catch((error) => {
            console.error(error)
        })
        setOpen(false);
    }

    const disconnect = () => {
        navigator.bluetooth.requestDevice({ acceptAllDevices: true })
            .then(device => device.gatt.disconnect())
            .catch(error => console.log(error));
    }

    const search = () => {
        navigator.bluetooth.getDevices()
            .then((res) => {
                setDevices(res)
            })
            .catch(error => console.log(error));
    }

    const handleChange_name = (event) => {
        setUserName_value(event.target.value);
    }
    const handleChange_device = (event) => {
        setDeviceName_value(event.target.value);
    };


    return (
        <div>
            <Button variant="outlined" color="primary" onClick={search}>検索</Button>
            <Button variant="outlined" color="primary" onClick={connect}>接続</Button>
            <Button variant="outlined" color="primary" onClick={disconnect}>切断</Button>
            <StickyHeadTable devices={devices} />
            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            device=「{deviceName_value ? deviceName_value : '不明'}」, deviceID=「{device_id}」
                        </DialogContentText>
                        <DialogContentText>
                            To subscribe to this website, please enter your name and device here. We will send updates
                            occasionally.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="user_name"
                            label="Name"
                            type="name"
                            fullWidth
                            value={userName_value}
                            onChange={handleChange_name}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="device"
                            label="Device"
                            type="device"
                            fullWidth
                            value={deviceName_value}
                            onChange={handleChange_device}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default Home;
