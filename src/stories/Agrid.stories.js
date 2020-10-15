import React from 'react';
import { Agrid } from '../lib';
import { Row, Col } from '../components';
import '../app.css';

export default {
  title: 'Example/Agrid',
  component: Agrid,
  // args: {
  //   row: '<Row/>',
  //   col: '<Col/>'
  // }
};

/**
 * Simple Agrid
 */
export const Simple = args => (
  <Agrid
    row={<Row/>}
    col={<Col/>}
    colsByRow={2}
  >
    <p>Col 1</p>
    <p>Col 2</p>
    <p>Col 3</p>
    <p>Col 4</p>
    <p>Col 5</p>
  </Agrid>
);
Simple.args = {
  colsByRow: 2
};

export const MultipleRows = args => (
  <Agrid
    row={<Row/>}
    col={<Col/>}
    colsByRow={[1, 3, 1]}
  >
    <p>Col 1</p>
    <p>Col 2</p>
    <p>Col 3</p>
    <p>Col 4</p>
    <p>Col 5</p>
  </Agrid>
);

export const CustomCol = args => (
  <Agrid
    row={<Row/>}
    col={<Col/>}
    colsByRow={[1, 3, 1]}
    defaultColProps={{
      className: 'col bg-skyblue'
    }}
    colProps={[
      [],
      [
        {},
        { className: 'col bg-goldenrod' } // only for second col of second row
      ]
    ]}
  >
    <p>Col 1</p>
    <p>Col 2</p>
    <p>Col 3</p>
    <p>Col 4</p>
    <Col className="col text-right bg-yellow">
      <p>Col 5</p>
    </Col>
  </Agrid>
);


