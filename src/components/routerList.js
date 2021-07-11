import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import RouterIcon from '@material-ui/icons/Router';
import DraftsIcon from '@material-ui/icons/Drafts';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import { Typography } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
        marginTop: 135,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '10px',
        boxShadow: '1px 4px 4px grey',
        backgroundColor: theme.palette.common.white,
    },
    title: {
        fontWeight: 'bold',
        fontSize: '15',
        margin: 15
    },
    button: {
        float: 'right',
        marginTop: 15,
        marginRight: 75,
    },
    paper: {
        border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
      },
}));

export default function RouterList() {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [routerList, setRouterList] = React.useState([]);
    const [routerSelectedId, setRouterSelectedId] = React.useState(null)
    const [routerNodes, setRouterNodes] = React.useState([])
    const [selectedNodeId, setSelectedNodeId] = React.useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    React.useEffect(() => {
        axios
            .get('http://localhost:3001/machines')
            .then(function (response) {
                console.log(response)
                response.data.push({m_id: 5,
                    m_ip: "192.168.40.40",
                    m_name: "routeur_5 *",
                    m_status: "up",
                    m_type: "ir1101",
                    m_zone: "eu-west-1"})
                setRouterList(response.data)
            })
            .catch(function(err){console.log(err)})
    }, []);

    var routerResponse = []
    React.useEffect(()=>{
        var index
        axios
        .get('http://localhost:3001/ls')
        .then(function(response){
            console.log(response, typeof response)
            routerResponse = response.data.split('\n')
            routerResponse.splice(0, 1)
            routerResponse.splice(0, 1)
            routerResponse.splice(routerResponse.length-1, 1)
            routerResponse.map(e=>{
               console.log(e.replace(/(\r\n|\n|\r)/gm, ""))
               index = routerResponse.indexOf(e)
               routerResponse[index] = e.replace(/(\r\n|\n|\r)/gm, "")
            })
            routerResponse.map(e=>{
                index = routerResponse.indexOf(e)
                routerResponse[index] = e.replace(/\s\s+/g, ' ');
            })
            routerResponse.map(e=>{
                index = routerResponse.indexOf(e)
                routerResponse[index] = e.split(" ");
            })
            console.log(routerResponse)
            setRouterNodes(routerResponse)
        })
        .catch(function(err){console.log(err)})
    })


    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        setRouterSelectedId(index)
    };

    const handlePopoverClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
      };

      const handleNodeButtonCLick = (node, event) => {
        setSelectedNodeId(node[0]);
        handlePopoverClick(event)
      }

    return (
        <Grid>
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography className={classes.title}>Sélctionnez un routeur</Typography>
                        <List item xs={3}>
                            {console.log('Router List: ', routerList),
                                routerList.map(e => {
                                    return (
                                        <ListItem button
                                            selected={selectedIndex === e.m_id}
                                            onClick={(event) => handleListItemClick(event, e.m_id)}>
                                            <ListItemIcon>
                                                <RouterIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={`${e.m_name}`} />
                                        </ListItem>

                                    )
                                })}
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            {
                                routerSelectedId !== null ?
                                    <div>
                                        <p className={classes.title}>Détails du routeur</p>
                                        <div>
                                            <p>ID: {routerList[routerSelectedId - 1].m_id}</p>
                                            <p>Nom: {routerList[routerSelectedId - 1].m_name}</p>
                                            <p>IP: {routerList[routerSelectedId - 1].m_ip}</p>
                                            <p>Zone: {routerList[routerSelectedId - 1].m_zone}</p>
                                            <p>Status: {routerList[routerSelectedId - 1].m_status}</p>
                                            <p>Type: {routerList[routerSelectedId - 1].m_type}</p>
                                        </div>
                                    </div>
                                : null
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box>
                            {
                                routerSelectedId !== null ?
                                routerList[routerSelectedId-1].m_ip == '192.168.40.40' ?
                                routerNodes !== []?
                                    <div>
                                        <p className={classes.title}>Noeuds</p>
                                        <div>
                                            {routerNodes.map(e=>{
                                                return(
                                                <div>
                                                    <p>{e[0]}</p>
                                                    <button onClick={(event)=>{handleNodeButtonCLick(e, event)}}>{e[1]}</button>
                                                    <Popper id={e[0]} open={open} anchorEl={anchorEl}>
                                                        <div className={classes.paper}>
                                                            <Button onClick={()=>{axios.get(`http://localhost:3001/activateImage?id=${selectedNodeId}`).then(function(response){console.log(response);alert(response.data)}).catch(function(err){console.log(err)})}}>Activer</Button>
                                                            <Button onClick={()=>{axios.get(`http://localhost:3001/startImage?id=${selectedNodeId}`).then(function(response){console.log(response);alert(response.data)})}}>Lancer</Button>
                                                            <Button onClick={()=>{axios.get(`http://localhost:3001/stopImage?id=${selectedNodeId}`).then(function(response){console.log(response);alert(response.data)})}}>Stopper</Button>
                                                            <Button onClick={()=>{axios.get(`http://localhost:3001/deactivateImage?id=${selectedNodeId}`).then(function(response){console.log(response);alert(response.data)})}}>Desactiver</Button>
                                                        </div>
                                                    </Popper>
                                                </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                : null
                                : null
                                : null
                            }
                        </Box>
                    </Grid>
                </Grid>
            </div>
            {routerList[routerSelectedId - 1]?.m_status === 'down' ? 
                <Button color='primary' variant='contained' className={classes.button}>Activer</Button>
            : routerList[routerSelectedId - 1]?.m_status === 'up' ?
                <Button color='primary' variant='contained' className={classes.button}>Désactiver</Button>
            : 
                null
            }
        </Grid>
    );
}