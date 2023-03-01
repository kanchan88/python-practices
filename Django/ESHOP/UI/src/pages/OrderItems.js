import { Card, Row, Col } from 'reactstrap';
import { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import { getSingleProduct } from '../_mocks_/repo/data';

function OrderItems({ id }) {
  const [items, setItems] = useState();

  const init = (id) => {
    getSingleProduct(id).then((data) => {
      setItems(data.data);
    });
  };

  useEffect(() => {
    init(id);
  }, []);

  console.log(id);
  return (
    <div>
      <TableCell align="right">
        <img src={items ? items.images[0].image : ''} width="50px" alt="" />
      </TableCell>
      <TableCell align="right">
        {items ? items.name : ''} @ Rs.{items ? items.price : ''}{' '}
      </TableCell>
    </div>
  );
}

export default OrderItems;
