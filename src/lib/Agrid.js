import React from 'react';
import {
  splitEvery,
  propOr,
  ifElse,
  pathOr,
  is,
  hasPath,
  isNil,
  always
} from 'rambda';
import PropTypes from 'prop-types';
import { splitBy } from './util/split';
import { Div } from './components';

/**
 * Primary UI component for user interaction
 */
const Agrid = ({
  children,
  colsByRow,
  col,
  defaultColProps,
  row,
  rowProps,
  colProps
}) => {
  if (!children) return null;

  if (!React.isValidElement(row)) {
    throw new Error('Invalid Row Component');
  }

  if (!React.isValidElement(col)) {
    throw new Error('Invalid Col Component');
  }

  if (!is(Array, children)) {
    // Check if is a fragment
    if (children.type === React.Fragment) {
      children = pathOr([], ['props', 'children'], children);
    } else {
      children = [children];
    }
  }

  let rowChildren = [];
  if (is(Array, colsByRow)) {
    rowChildren = splitBy(colsByRow, children);
  } else {
    // Chunk by row [[{}, {}, {}], [{}, {}]]
    rowChildren = splitEvery(colsByRow || children.length, children);
  }
  const getColProps = (rowIndex, colIndex) => {
    if (isNil(colsByRow)) {
      const size = propOr({}, colIndex, colProps);
      return is(Array, size) ? {} : size;
    } else {
      return ifElse(
        hasPath([rowIndex, colIndex]),
        pathOr({}, [rowIndex, colIndex]),
        always({})
      )(colProps);
    }
  };
  
  return rowChildren.map((_children, rowIndex) => {
    const rowKey = `agr.${rowIndex}`;
    const colChildren = React.Children.map(_children, (_child, colIndex) => {
      const colKey = `agc.${colIndex}`;
      if (_child.type === col.type || _child.type === col) {
        return React.cloneElement(_child, { key: colKey });
      } else {
        return React.cloneElement(col, {
          ...defaultColProps,
          ..._child.props,
          ...getColProps(rowIndex, colIndex),
          key: colKey
        });
      }
    });
    
    return React.cloneElement(row, {
      ...rowProps,
      key: rowKey,
      children: colChildren
    });
  });
};


Agrid.propTypes = {
  /**
   * Custom Row Component
   */
  row: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /**
   * Custom row props
   */
  rowProps: PropTypes.object,
  /**
   * Custom Col Component
   */
  col: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /**
   * Custom default col props
   */
  defaultColProps: PropTypes.object,
  /**
   * 
   */
  colProps: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array])),
  /**
   * 
   */
  colsByRow: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)])
};

Agrid.defaultProps = {
  row: <Div/>,
  col: <Div/>,
  rowProps: {},
  defaultColProps: {},
  colProps: []
};


export default Agrid;