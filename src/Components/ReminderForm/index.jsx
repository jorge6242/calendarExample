import React from 'react'
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form'
import './index.sass';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  red: {
    margin: theme.spacing.unit,
    background: '#F44336',
  },
  blue: {
    margin: theme.spacing.unit,
    background: '#2196F3',
  },
  green: {
    margin: theme.spacing.unit,
    background: '#8BC34A',
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const validate = values => {
  const errors = {}
  if (!values.description) {
    errors.description = 'Required'
  } else if (!values.city) {
    errors.city = 'Required'
  } 
  else if (!values.time) {
    errors.time = 'Required'
  } 
  if (!values.email) {
    errors.email = 'Required'
  } 
  return errors
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
  </div>
)

const renderTextArea = ({input, meta: { touched, error, warning }}) => (
  <div>
    <textarea {...input} placeholder="Reminder" rows="1" cols="20" maxLength="30"/>
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

const ReminderForm = props => {
  const { handleSubmit, pristine, reset, submitting, handleReminderForm, formReducer, classes, changeColor } = props
  return (
    <Grid container spacing={0} className="reminder-form">
    <form onSubmit={handleSubmit(handleReminderForm)}>
        <Grid item xs={12} className="reminder-form__field">
          <Field
            name="description"
            type="text"
            component={renderTextArea}
            label="Reminder"
          />
        </Grid>
        <Grid item xs={12} className="reminder-form__field">
          <Field
            name="city"
            type="text"
            component={renderField}
            label="City"
          />
        </Grid>
        <Grid item xs={12} className="reminder-form__field">
          <Field name="time" type="time" component={renderField} />
        </Grid>
        <Grid item xs={12} >
        <Fab size="small" color="primary" aria-label="Add" className={classes.margin} onClick={() => changeColor('blue')} />
        <Fab size="small" color="secondary" aria-label="Add" className={classes.margin} onClick={() => changeColor('red')} />
        </Grid>
        <Grid item xs={12} className="reminder-form__field" >
          <button type="submit" disabled={submitting}>{formReducer.description === '' ? 'Create' : 'Update'}</button>
          {formReducer.id === '' && (
            <button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear Values
            </button>
          )}
        </Grid>
    </form>
    </Grid>
  );
}

const mS = state => ({
  initialValues: state.reminderFormReducer,
  formReducer: state.reminderFormReducer,
});

const CustomReminderForm = reduxForm({ form: 'reminderForm', validate, enableReinitialize: true })(ReminderForm);

export default withStyles(styles)(connect(mS)(CustomReminderForm));
