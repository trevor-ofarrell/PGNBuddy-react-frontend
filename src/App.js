import React, { useState, useEffect } from "react";
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Box } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';

import {
    ResponsiveAppBar,
    Accordian,
} from "./components"

import logo from './logo.svg';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
      width: '100%',
      height: '100vh',
      backgroundImage: 'url("/checkmate.jpeg")',
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      zIndex: '0',
      alignItems: "center",
      justifyContent: "center",
  },
  paper: {
      background: 'linear-gradient(180deg, rgba(166, 166, 166, 0.462) 0%, rgba(53, 53, 53, 0.414) 22%, rgba(0, 0, 0, 0.758) 100%)',
      zIndex: '2',
      width: '90vw',
      height: '85vh',
      margin: 'auto',
      marginTop: '3vh',
  },
}));

function App() {
  const classes = useStyles();
  const [hasError, setErrors] = useState(false);
  const [planets, setPlanets] = useState({});

  async function fetchData() {
    const res = await fetch("http://127.0.0.1:5000/status");
    setPlanets(res.statusText)
    console.log(res)
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <Box className={classes.root}>
      <ResponsiveAppBar />
      <Box>
          <Paper elevation={1} className={classes.paper}>
              <Accordian/>
          </Paper>
      </Box>
    </Box>

  );
}

export default App;
