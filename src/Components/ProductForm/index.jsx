import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { Field, reduxForm } from "redux-form";
import "./index.sass";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  red: {
    margin: theme.spacing.unit,
    background: "#F44336"
  },
  blue: {
    margin: theme.spacing.unit,
    background: "#2196F3"
  },
  green: {
    margin: theme.spacing.unit,
    background: "#8BC34A"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <input {...input} placeholder={label} type={type} />
    {touched &&
      ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

const ProductForm = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    handleReminderForm,
    formReducer
  } = props;
  return (
    <Grid container spacing={0} className="reminder-form">
      <form onSubmit={handleSubmit(handleReminderForm)}>
        <Grid item xs={12} className="reminder-form__field">
          <Field name="name" type="name" component={renderField} label="Name" />
        </Grid>
        <Grid item xs={12} className="reminder-form__field">
          <button type="submit" disabled={submitting}>
            {formReducer.id === "" ? "Create" : "Update"}
          </button>
          {formReducer.id === "" && (
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
};

const mS = state => ({
  initialValues: state.productFormReducer,
  formReducer: state.productFormReducer
});

const CustomProductForm = reduxForm({
  form: "productForm",
  validate,
  enableReinitialize: true
})(ProductForm);

export default withStyles(styles)(connect(mS)(CustomProductForm));
