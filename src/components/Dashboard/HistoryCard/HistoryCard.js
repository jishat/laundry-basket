import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles=makeStyles(theme=>({
    root:{
        padding:'2rem',
    },
    historyContainer:{
        backgroundColor:'white',
        padding:'20px',
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        borderRadius:'10px',
    },
    receiverInfoSection:{
        color:'black',
        '& span':{
            fontWeight:'600',
            marginRight:'10px',
        },
        '& p':{
            margin:'5px 10px'
        },
        '& h5':{
            marginTop:'0',
            marginBottom:'10px',
        }

        
    },
    courierInfoSection:{
        color:'black',
        '& span':{
            fontWeight:'600',
            marginRight:'10px',
        },
        '& p':{
            margin:'5px 10px',
           
        },
        '& h5':{
            marginTop:'0',
            marginBottom:'10px'

        }
        
        
    }
}))

const HistoryCard = (props) => {
    const classes=useStyles();
    console.log(props.historyData);
    const {PickupAddress,RecieverName,RecieverPhone,cost,date,email,numberOfBox,senderName,senderPhone,shippingAddress,weight,_id}=props.historyData;
    return (
        <Grid item md={6} xs={12} className={classes.root}>
            <div className={classes.historyContainer}>
                <div>
                    <h3 style={{margin:'0',textAlign:'center'}}>{date}</h3>
                </div> <br />
                <div className={classes.receiverInfoSection}>
                    <h5>Receiver Information</h5>
                    <p><small><span>Name:</span> {RecieverName} </small></p>
                <p><small><span>Mobile:</span>{RecieverPhone}</small></p>
                    <hr />

                </div>
                <div className={classes.courierInfoSection}>
                <h5>Courier Information</h5>
                    <p><small><span>Courier No:</span>{_id} </small></p>
                    <p><small><span>Destination:</span>{shippingAddress} </small></p>
                    <p><small><span>Number Of Boxes:</span>{numberOfBox} </small></p>
                    <p><small><span>Weight:</span>{weight} </small></p>
                    <p><small><span>Courier Cost:</span>{cost} Taka</small></p>
                    <p><small><span>Pay With:</span>Credit Card </small></p>

                </div>
            </div>
        </Grid>
    );
};

export default HistoryCard;