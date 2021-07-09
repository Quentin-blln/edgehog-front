import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoginPage from './components/login';
import RegisterPage from './components/register';
import RouterList from './components/routerList';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function App() {
  const [focusRegister, setFocusRegister] = useState(0)
  const [focusLogin, setFocusLogin] = useState(0)
  const [displayRouterList, setDisplayRouterList] = useState(0)
  const [userLogged, setUserLogged] = useState(0)
  const [routerList, setRouterList] = useState([])
  
  const classes = useStyles();  

  var testUser= {
    username: 'LaurentMaille',
    password: 'jsp',
    email: 'febfh@gmail.com'
  }

  useEffect(() => {
    if(userLogged.u_mail){
      setFocusLogin(0)
      setFocusRegister(0)
    }
    else{setFocusLogin(1)}
  },[userLogged]);


  function Header () {
    return(
      <header>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                <Button href='/#' onClick={()=>{setFocusLogin(0); setFocusRegister(0)}}>
                HedgeHog
                </Button>
              </Typography>
              {userLogged?
              <div>
              <Typography variant="h7" className={classes.title}>
                Bienvenue  {userLogged.u_firstname}
              </Typography>
              </div>
              :<div><Button color="inherit" onClick={()=>{setFocusLogin(1); setFocusRegister(0)}}>Login</Button></div>
              }
            </Toolbar>
          </AppBar>
        </header>
    )
  }

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="#">
          QAMM
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  if(focusLogin==1){
    return(
      <div className="App">
      <Header/>
      <LoginPage login={user => setUserLogged(user)}/>
      <Box mt={8}>
        <Copyright />
      </Box>
    </div>
    )
  }

  else{
    return (
      <Router>
        <div className="App">
          <Header/>
          <Route path='/register' component= {RegisterPage}/>
          {userLogged.r_isAdmin==1?
          <RouterList list= {routerList}/>
          :null
        }
          <Box mt={8}>
            <Copyright />
          </Box>
        </div>
      </Router>
    );
  }
}

export default App;
