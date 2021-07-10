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
    }
}));

export default function RouterList() {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [routerList, setRouterList] = React.useState([]);
    const [routerSelectedId, setRouterSelectedId] = React.useState(null)

    React.useEffect(() => {
        axios
            .get('http://localhost:3001/machines')
            .then(function (response) {
                console.log(response)
                setRouterList(response.data)
            })
    }, []);


    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        setRouterSelectedId(index)
    };

    return (
        <Grid>
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={6}>
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
                </Grid>

                {/* <List component="nav" aria-label="main mailbox folders">
            <ListItem
            button
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
            >
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            </ListItem>

            <ListItem
            button
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
            >
            <ListItemIcon>
                <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
            </ListItem>

      </List>

      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary="Spam" />
        </ListItem>
      </List> */}
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