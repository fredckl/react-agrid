import React from 'react';
import { splitEvery, propOr, ifElse, pathOr, is, hasPath, isNil, always } from 'rambda';
import propTypes from 'prop-types';
import { splitBy } from './util/split';
import { Div } from './components';

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
  row = row || Div;
  col = col || Div;

  if (is(Function, row)) row = row({});
  if (is(Function, col)) col = col({});

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

      if (_child.type === col) {
        return React.cloneElement(col, {
          key: colKey,
          children: _child
        });
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

Agrid.defaultProps = {
  rowProps: {},
  defaultColProps: {},
  colProps: []
};

Agrid.propTypes = {
  row: propTypes.oneOfType([propTypes.object, propTypes.func]),
  rowProps: propTypes.object,
  col: propTypes.oneOfType([propTypes.object, propTypes.func]),
  defaultColProps: propTypes.object,
  colProps: propTypes.arrayOf(propTypes.oneOfType([propTypes.object, propTypes.array])),
  colsByRow: propTypes.oneOfType([propTypes.number, propTypes.arrayOf(propTypes.number)])
};

export default Agrid;