import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';

const useStyles=makeStyles(theme=>({
    detailContainer:{
        textAlign:'center',
        padding:'1rem',
        
    },
    mainContainer:{
        padding:'2rem',
        backgroundColor: 'white',
        borderRadius:'5px', 
        '&:hover':{
            boxShadow: "0 4px 8px 0 rgb(0 0 0 / 6%), 0 0px 0px 0 rgb(0 0 0 / 0)",                       
            transition:'0.4s all ease',
            cursor:'pointer',
        }
    },
    img:{
        height:'100px',
        margin:'10px 20px'
    }

}))

const ServiceCard = (props) => {
    const classes=useStyles();
    const [,,,setSelectedService]=useContext(UserContext);
    const {title,description}=props.service;
    const history=useHistory();
    const handleServiceClick=()=>{
        setSelectedService(title);
        history.replace('/dashboard');
    }
    
    return (
            <Grid item md={4} onClick={handleServiceClick} className={classes.detailContainer}>
                <div className={classes.mainContainer}>
                    <div>
                        <h2 style={{marginTop:'0', color:'#03a9f4'}}>
                            {title}
                        </h2>
                        <p style={{color:'gray'}}>
                            {description}
                        </p>
                    </div>
                </div>
            </Grid>
    );
};

export default ServiceCard;