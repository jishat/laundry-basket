import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../../App';
import HistoryCard from '../HistoryCard/HistoryCard';

const useStyles=makeStyles(theme=>({
    root:{
        backgroundColor:'#00386814',
        borderRadius:'10px',
        padding:'20px'

    }
}))
const CourierHistory = () => {
    const [loggedInUser,,,]=useContext(UserContext);
    const classes=useStyles();
    const [courierHistory,setCourierHistory]=useState({});
    useEffect(()=>{
        fetch("https://warm-badlands-71621.herokuapp.com/getCourierById",{
            method: "POST",
            body: JSON.stringify({email:loggedInUser.email}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(json => setCourierHistory(json));
    },[])
    return (
        <div className={classes.root}>
            <Grid container >
                {courierHistory[0]&&courierHistory.map(data=><HistoryCard historyData={data}></HistoryCard>)}
            </Grid>

        </div>
    );
};

export default CourierHistory;