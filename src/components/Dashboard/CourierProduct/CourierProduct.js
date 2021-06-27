import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';

import Button from '@material-ui/core/Button';
import { useContext } from 'react';
import { UserContext } from '../../../App';
import PaymentCard from '../PaymentCard/PaymentCard';
import { UserContextDashboard } from '../Dashboard/Dashboard';
import { useHistory } from 'react-router-dom';

const useStyles=makeStyles(theme=>({
    root:{
        // backgroundColor:'#00376805',
        borderRadius:'10px',
        padding:'2rem 3rem',
        '& h4':{
            color:'gray',
            // marginBottom:"5px",
        }
    },
    inputBox:{
        width:'320px',
        backgroundColor:'white',
        margin:'25px 0px',
        borderRadius:'5px'
    },
    formControl: {
        minWidth: 220,
      },
}))

const CourierProduct = () => {
    const classes=useStyles()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loggedInUser,,selectedService,]=useContext(UserContext);
    const [,,,setPaymentInfo]=useContext(UserContextDashboard);
    const history=useHistory();
    console.log(selectedService);
    const [state, setState] = React.useState({
        service: '',
      });
    const [values, setValues] =useState({
        weight: '',
        weightRange: '',
      });
    const handleWeightChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

    const handleServiceChange = (event) => {
        const service = event.target.name;
        setState({
            ...state,
            [service]: event.target.value,
        });
      };
    

    const onSubmit = data =>{
        const {RecieverName,RecieverPhone,numberOfBox,senderName,senderPhone,shippingAddress}=data;
        let cost;
        if(state.service==="Door to Door"){
            cost=20;
        }
        else if(state.service==="Standard"){
            cost=30;
        }
        else{
            cost=40;
        }
        const total=Number(values.weight)*Number(data.numberOfBox)*cost;
        data.weight=values.weight;
        data.cost=total;
        data.date=new Date().toDateString();
        data.email=loggedInUser.email;
        data.service=state;
        setPaymentInfo(data);
        history.replace('/payment');
    }
    return (
        <section className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <div>
                            <h4>Sender Details</h4>
                            <TextField required className={classes.inputBox} label=" Name" {...register("senderName", { required: true })}/> <br />
                            
                            <TextField required className={classes.inputBox} label=" Phone Number" {...register("senderPhone", { required: true })}/><br />
                            
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div>
                            <h4>Reciever Details</h4>
                            <TextField required className={classes.inputBox} label=" Name" {...register("RecieverName", { required: true })}/><br />
                            
                            <TextField required className={classes.inputBox} label=" Phone Number" {...register("RecieverPhone", { required: true })}/><br />
                            
                        </div>
                    </Grid>
                </Grid>
                
                <br />
               
                <div>
                    <h4>Shipping</h4>
                    <Grid container style={{paddingTop:'25px'}}>
                        
                        <Grid item xs={12} md={4}>
                            <TextField
                                id="filled-number"
                                label="Number Of Boxes"
                                required
                                style={{backgroundColor:'white',borderRadius:'5px'}}
                                type="number"
                                defaultValue={"selectedService"}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="filled"
                                {...register("numberOfBox", { required: true })}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    value={values.weight}
                                    required
                                    type="number"
                                    style={{backgroundColor:'white',borderRadius:'5px'}}
                                    onChange={handleWeightChange('weight')}
                                    endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                    'aria-label': 'weight',
                                    }}
                                    labelWidth={0}
                                    // {...register("weight", { required: true })}
                                />
                                <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>

                            <FormControl className={classes.formControl}>
                                <Select
                                value={state.service}
                                onChange={handleServiceChange}
                                displayEmpty
                                className={classes.selectEmpty}
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{padding:'5px 0px',backgroundColor:'white',borderRadius:'5px'}}
                                inputProps={{
                                    name: 'service',
                                    id: 'age-native-simple',
                                }}
                                >
                                <MenuItem value="" disabled>
                                    {selectedService||"Select Service"}
                                </MenuItem>
                                <MenuItem value={"Standard"}>Standard</MenuItem>
                                <MenuItem value={"Door to Door"}>Door to Door</MenuItem>
                                <MenuItem value={"Express"}>Express</MenuItem>
                                </Select>
                                <FormHelperText>Placeholder</FormHelperText>
                            </FormControl>

                        </Grid>
                        <Grid item xs={12} md={12}>
                        <TextField required  style={{width:'80%',margin:'25px 0px',backgroundColor:'white',borderRadius:'5px'}} label=" Pick Up Point Address" {...register("PickupAddress", { required: true })}/>
                        <TextField required  style={{width:'80%',margin:'25px 0px',backgroundColor:'white',borderRadius:'5px'}} label=" Shipping Address" {...register("shippingAddress", { required: true })}/>
                        </Grid>
                    </Grid>
                </div>
                <Button variant="contained" style={{marginTop:'30px'}} type="submit" color="primary">
                    SUBMIT FORM
                </Button>
            </form>

        </section>
    );
};

export default CourierProduct;