import {
  Paper,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Button,
  TableFooter,
  TablePagination,
} from '@material-ui/core';
import React, { useState } from 'react';
import ApiClient from '../api-client/ApiClient';
import { useHistory } from 'react-router-dom';

const OrdersTable = (props) => {
  const apiClient = new ApiClient();
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.orders.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  const deliverOrder = (event, order) => {
    apiClient.deliverOrder(order).catch(() => history.push('/error'));
  };

  return (
    <Paper className="paper-left" elevation={3}>
      <Typography>{props.title}</Typography>
      <Divider></Divider>
      <TableContainer>
        <Table stickyHeader size="small" height="100">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>date & time</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Delivered crates</TableCell>
              {!props.disableButton && <TableCell>Deliver</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? props.orders.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : props.orders
            ).map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.datetime}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {order.deliveredCrates === undefined
                    ? 'ND'
                    : order.deliveredCrates}
                </TableCell>
                {!props.disableButton && (
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      type="submmit"
                      disabled={
                        props.disableButton || order.status !== 'Pending'
                      }
                      onClick={(event) => deliverOrder(event, order)}
                    >
                      Deliver
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={props.orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default OrdersTable;
