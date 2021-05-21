import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';




const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(3),
        width: '25ch',
      },
    },
  }));

  
  const LoginPage = ({ login }) => {
    const classes = useStyles();
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginRequest = () => {
        if(username !=='' && password !== ''){
            axios
            .get(`https://127.0.0.1:3001/login`, {username: username, password: password})
            .then(function(response){
                if(response=='SI LA BASE DIT QUE LES LOGINS SON CORRECTS'){
                    login(response.data)
                }
                console.log(response)
            })
            .catch(err=>{console.error(err)})
        }
        else{
            alert('Veuillez remplir les champs.')
        }
    }
    
    return(
    <div>
        <br/>
        <Typography variant="h6" className={classes.title}>
                Connectez vous
        </Typography>
    <br />
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Username" onChange={(e)=>{setUsername(e.target.value)}}/>
            <br />
            <TextField id="standard-basic" label="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <br />
            <Button onClick={()=>{loginRequest()}}>Connexion</Button>
        </form>
    </div>
    )
}

export default LoginPage;