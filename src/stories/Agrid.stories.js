import React from 'react';
import { Agrid } from '../lib';
import { Row, Col } from '../components';
import '../app.css';

export default {
  title: 'Agrid',
  component: Agrid,
  args: {
    row: 'Component',
    col: 'Component'
  }
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
    <p>1</p>
    <p>2</p>
    <p>3</p>
    <p>4</p>
    <p>5</p>
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
    <p>1</p>
    <p>2</p>
    <p>3</p>
    <p>4</p>
    <p>5</p>
    </Agrid>
);

export const SpecificCol = args => (
  <Agrid
    row={<Row/>}
    col={<Col/>}
    colsByRow={[1, 3, 1]}
  >
    <p>1</p>
    <p>2</p>
    <p>3</p>
    <p>4</p>
    <Col className="col-full-width text-center">
      <p>5</p>
    </Col>
    </Agrid>
);


