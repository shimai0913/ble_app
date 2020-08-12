import React from 'react';
import { Button } from '@material-ui/core';
// import firebase, { db } from '../firebase';
// import firebase from '../firebase';


function Setting() {
    const all_option = { acceptAllDevices: true };

    const connect = () => {
        // １．BLEデバイスをスキャンする
        navigator.bluetooth.requestDevice(all_option)
            .then(device => {
                // ２．デバイスに接続
                return device.gatt.connect();
            })
            .then(server => {
                return server.getPrimaryServices()
            })
            .catch(error => console.log('エラー：' + error));
    }

    const disconnect = () => {
        console.log('disconnect発火')
        navigator.bluetooth.requestDevice({ acceptAllDevices: true })
            .then(device => device.gatt.disconnect())
            .catch(error => console.log(error));
    }

    return (
        <div>
            <Button color="primary" onClick={connect}>接続</Button>
            <Button color="primary" onClick={disconnect}>切断</Button>
        </div>
    )
}

export default Setting;
