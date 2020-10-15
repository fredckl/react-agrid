import React from 'react';
import './app.css';
import { Agrid } from './lib';
import { Row, Col} from './components';

const styles = {
  textAlign: 'center',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'uppercase'
};
function App() {
  return (
    <div className="App" style={styles}>
      <Agrid
        colsByRow={[3]}
        row={<Row/>}
        rowProps={{className: 'row'}}
        col={<Col/>}
        defaultColProps={{ className: 'col col-default' }}
        colProps={[
          [{}, {className: 'col col-first'}]
        ]}
      >
        <p>Column 1</p>
        <p>Column 2</p>
        <p>Column 3</p>
        <p>Column 4</p>
        <p>Column 5</p>
        <p>Column 6</p>
        <Col className="col col-last text-right">
          <p>Column 7</p>
        </Col>
      </Agrid>
    </div>
  );
}

export default App;
