import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Modal from "../../Components/Modal";
import { updateModal } from "../../Actions/modalActions";
import { getAll, get } from "../../Actions/productActions";
import ProductList from "../../Components/ProductList";
import Product from "../Product";
import "./index.sass";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAll();
  }

  handleClick = () => {
    this.props.updateModal({ payload: { status: true, element: <Product /> } });
  };

  handleEdit = id => {
    this.props.get(id);
    this.props.updateModal({ payload: { status: true, element: <Product /> } });
  };

  render() {
    const { classes, products } = this.props;
    return (
      <Grid container spacing={0} id="dashboard">
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row" align="center">
                  Products
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(product => (
                <ProductList product={product} handleEdit={this.handleEdit} />
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Grid
          item
          xs={12}
          className="dashboard__create"
          onClick={this.handleClick}
        >
          <Fab color="primary" aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Grid>
        <Modal />
      </Grid>
    );
  }
}

const mS = ({ productReducer: { products } }) => ({
  products
});

const mD = {
  updateModal,
  getAll,
  get
};

export default connect(
  mS,
  mD
)(withStyles(styles)(Dashboard));
