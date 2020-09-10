import React from 'react';
import { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);


export const Accordian = () => {
    const [gameData, setGameData] = useState({});

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  
    async function fetchData() {
      const res = await fetch("http://127.0.0.1:5000/mydatabase");
      res
        .json()
        .then(res => setGameData(res))
    }
  
    useEffect(() => {
      fetchData();
    }, []);

    return gameData && (
        <div>
            {gameData.pgnlist ? gameData.pgnlist.map((item, index) => (
              <Accordion square expanded={expanded === 'panel' + String(index)} onChange={handleChange('panel' + String(index))}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography>{JSON.stringify(item.name)}</Typography>
                </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {JSON.stringify(item.game)}
                </Typography>
              </AccordionDetails>
            </Accordion>
            )) : 'fetching....' }
        </div>
    )
}                