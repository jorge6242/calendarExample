import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Day from '../../Components/Day';
import Modal from '../../Components/Modal';
import { updateModal } from '../../Actions/modalActions';
import Reminder from '../Reminder';
import { setEdit } from '../../Actions/reminderFormActions';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Dashboard extends Component {
  state ={
    date: moment(),
    weekdays : moment.weekdaysShort(),
  }


  handleReminder = (day, currentDay) => {
    const { reminderFormReducer } = this.props;
    if (day > 0) {
      reminderFormReducer.date = currentDay;
      console.log('reminderFormReducer ', reminderFormReducer);
      this.props.setEdit(reminderFormReducer);
      this.props.updateModal({ payload: { status: true, element: <Reminder currentDate={currentDay} /> } });
    }
  }

  handleEdit = data => {
    console.log('data ' ,data);
    this.props.setEdit(data);
    this.props.updateModal({ payload: { status: true, element: <Reminder isEdition />} });
  }

  firstDayOfMonth = () => {
    const { date } = this.state;
    return moment(date).startOf('month').format('d');
  }

  currentDays = () => {
    const { reminderReducer } = this.props;
    const { date } = this.state;

    const blankDays = [];
    const monthDays = [];
    const rows = [];
    let cells = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
        blankDays.push( <Day key={i*10} day="" handleReminder={this.handleReminder}/>);
    }
    for (let d = 1; d <= date.daysInMonth(); d++) {
        const currentDay = moment([date.format("Y"), date.format("MM"), d]).format('YYYY-MM-DD')
        const reminders = currentDay in reminderReducer ? reminderReducer[currentDay] : [];
        monthDays.push(
            <Day 
              key={d} 
              day={d} 
              currentDay={currentDay} 
              handleReminder={this.handleReminder}
              reminders={reminders}
              handleEdit={this.handleEdit}
            />
        );
    }
    const totalDays = [...blankDays, ...monthDays];
    totalDays.forEach((row, i) => {
        if ((i % 7) !== 0) {
            cells.push(row);
        } else {
            const insertRow = cells.slice();
            rows.push(insertRow);
            cells = [];
            cells.push(row);
        }
        if (i === totalDays.length - 1) {
            let insertRow = cells.slice();
            rows.push(insertRow);
        }
    });
    return rows.map((d, i) => (<TableRow key={i}>{d}</TableRow>));
  }

  render() {
    const { classes } = this.props;
    const { weekdays, date } = this.state;
    return (
      <Grid container spacing={0}>
       <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row" colSpan="7" align="center">
              {date.format("MMMM")}{""}{date.format("Y")}
            </TableCell>
          </TableRow>
        </TableHead> 
        <TableHead>
          <TableRow>
            {weekdays.map((day, i) => (
                <TableCell key={i} component="th" scope="row">
                  {day}
                </TableCell>
            ))}
          </TableRow>
        </TableHead> 
        <TableBody>
            {this.currentDays()}
        </TableBody>
      </Table>
    </Paper>
    <Modal />
      </Grid>
    );
  }
}

const mS = ({ reminderReducer, reminderFormReducer }) => ({ reminderReducer, reminderFormReducer });

const mD = {
  updateModal,
  setEdit,
}

export default connect(mS,mD)(withStyles(styles)(Dashboard));