import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const LoginPage = ({ login }) => {
  const classes = useStyles();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginRequest = () => {
    if (username !== '' && password !== '') {
      axios
        .get(`https://127.0.0.1:3001/login`, { username: username, password: password })
        .then(function (response) {
          if (response == 'SI LA BASE DIT QUE LES LOGINS SON CORRECTS') {
            login(response.data)
          }
          console.log(response)
        })
        .catch(err => { console.error(err) })
    }
    else {
      alert('Veuillez remplir les champs.')
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Connectez vous
        </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse e-mail"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => { setUsername(e.target.value) }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => { setPassword(e.target.value) }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => { loginRequest() }}
            >
              Connexion
          </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Mot de passe oublié?
              </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"?? Faire une demande de compte ??"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>

    </div>
  )
}

export default LoginPage;