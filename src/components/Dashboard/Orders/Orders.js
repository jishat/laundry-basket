import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import OrderlistItem from '../OrderlistItem/OrderlistItem';

const orderList=[
    {name:"Araf",email:"Araf@gmail.com",service:"urgent",payWith:"Bkash",status:"pending",pickUpPoint:"Bahaddarhat",DestinationPoint:"Chorarkul",parcelWeight:"5kg"},
    {name:"Muna",email:"Muna@gmail.com",service:"important file transfer",payWith:"Nogod",status:"pending",pickUpPoint:"Andarkilla",DestinationPoint:"Oxygen",parcelWeight:"7kg"},
    {name:"Jishat",email:"Jishat@gmail.com",service:"standby",payWith:"Tea-Tap",status:"pending",pickUpPoint:"Bahaddarhat",DestinationPoint:"Khatiber Hat",parcelWeight:"3kg"},
    {name:"Emon",email:"Emon@gmail.com",service:"urgent",payWith:"Nogod",status:"pending",pickUpPoint:"Khatiber Hat",DestinationPoint:"Chorarkul",parcelWeight:"10kg"},
    {name:"Opu",email:"Opu@gmail.com",service:"Important File",payWith:"Credit Card",status:"pending",pickUpPoint:"Chorarkul",DestinationPoint:"Bahaddarhat",parcelWeight:"2kg"},
    {name:"Joyita",email:"Joyita@gmail.com",service:"standby",payWith:"Bkash",status:"pending",pickUpPoint:"Patharghata",DestinationPoint:"Oxygen",parcelWeight:"4kg"},
    {name:"Taifur",email:"aifur@gmail.com",service:"important file",payWith:"Credit Card",status:"pending",pickUpPoint:"Oxygen",DestinationPoint:"Khatiber Hat",parcelWeight:"kg"},

]

const useStyles=makeStyles(theme=>({
    header:{
        '& h4':{
            color:'gray',
        },
    },
    orderROot:{
        backgroundColor:'#00386814',
        borderRadius:'10px',
        padding:'15px',
    },
    orderTable:{
        backgroundColor:'white',
        padding:'0px 15px',
        borderRadius:'10px',
    }
}))

const Orders = () => {
    const classes=useStyles();
    const [courierList,setCourierList]=useState([]);
    useEffect(()=>{
        fetch("https://warm-badlands-71621.herokuapp.com/getAllCourierDetails")
        .then(response => response.json())
        .then(json => setCourierList(json));
    },[])
    return (
        <section className={classes.orderROot}>
            <Grid container className={classes.header}>
                <Grid item md={3}><h4>Name</h4></Grid>
                <Grid item md={3}><h4>Email Id</h4></Grid>
                <Grid item md={2}><h4>Service</h4></Grid>
                <Grid item md={2}><h4>Pay With</h4></Grid>
                <Grid item md={2}><h4>Status</h4></Grid>
            </Grid>
            <div className={classes.orderTable}>
                {courierList[0] && courierList.map(courierData=><OrderlistItem data={courierData}></OrderlistItem>)}
            </div>
            
            
        </section>
    );
};

export default Orders;