import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import { Button, ListItemSecondaryAction } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));


function InteractiveList(props) {
    const classes = useStyles();
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(props.items);
    }, [props])

    const newList = items.map((item) => {
        return (
            <ListItem key={item}>
                <ListItemIcon>
                    <PhoneIphoneIcon />
                </ListItemIcon>
                <ListItemText
                    primary={'(ID: ' + item + ')'}
                />
            </ListItem>
        )
    });

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <div className={classes.demo}>
                        <List>
                            {newList}
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}


export default InteractiveList;
