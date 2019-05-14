import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import ReminderForm from '../../Components/ReminderForm';
import { createReminder, updateReminder, deleteReminder } from '../../Actions/remindersAction';
import { updateModal } from '../../Actions/modalActions';
import { clear, setEdit } from '../../Actions/reminderFormActions';
import './index.sass';

class Reminder extends Component {

  handleReminderForm = form => {
    const { currentDate, reminderFormReducer } = this.props;
    const color = reminderFormReducer.color === '' ? 'blue' : reminderFormReducer.color;
    if(reminderFormReducer.description !== ''){
      this.props.updateReminder({ payload: { id: reminderFormReducer.id, ...form, color } });
    } else {
      this.props.createReminder({ payload: { date: currentDate, ...form, color  } });
    }
    this.props.updateModal({ payload: { status: false, element: <div /> } });
    this.props.clear();
  }

  handleClose = () => {
    this.props.updateModal({ payload: { status: false, element: <div /> } });
    this.props.clear()
  }

  handleRemove = () => {
    const { reminderFormReducer } = this.props;
    this.props.deleteReminder({ payload: { ...reminderFormReducer } });
    this.props.updateModal({ payload: { status: false, element: <div /> } });
    this.props.clear()
  }

  changeColor = color => {
    const { reminderFormReducer } = this.props;
    reminderFormReducer.color = color;
    this.props.setEdit(reminderFormReducer);
  }

  render() {
    const { reminderFormReducer } = this.props;
    return (
      <Grid container spacing={0} className="reminder-container">
        <Grid container spacing={0}>
          <Grid
            item
            xs={2}
            className="reminder-container__close"
            onClick={() => this.handleClose()}
          >
            <ClearIcon />
          </Grid>
          <Grid item xs={8} className="reminder-container__title">
            Reminder
          </Grid>
          <Grid item xs={2} className="reminder-container__delete">
            {reminderFormReducer.description !== '' && <DeleteIcon onClick={() => this.handleRemove()} />}
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <ReminderForm handleReminderForm={this.handleReminderForm} changeColor={this.changeColor} />
          </Grid>
        </Grid>
      </Grid>
    ); 
  }
}

const mS = ({ reminderFormReducer }) => ({ reminderFormReducer });

const mD = {
  createReminder,
  updateReminder,
  deleteReminder,
  updateModal,
  setEdit,
  clear,
}

export default connect(mS,mD)(Reminder);