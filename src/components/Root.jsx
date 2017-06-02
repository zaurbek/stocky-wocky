import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import { Grid, Menu, Button, Input } from 'semantic-ui-react';

import { tryStock, placeNewStocks, takeFresh, deleteStock } from '../actions';

let socket;
class Root extends Component {
  constructor(props) {
    super(props);
    socket = io.connect('https://stocky-wocky.herokuapp.com/');


    socket.on('returnNewStocks', (res) => {
      this.props.placeNewStocks(res);
    });
  }

  componentDidMount() {
    this.props.takeFresh(socket);
  }
  componentWillUnmount() {
    socket.disconnect();
  }
  stock() {
    if (this.Input.value.length > 0) {

      this.props.tryStock(socket, this.Input.value.toUpperCase());
      this.Input.value = '';
    }

  }
  render() {
    return (
      <div>
        <div className="chart">
          <ReactHighstock config={this.props.config} />

          <Grid className="grid-main" doubling columns={3}>

            {this.props.stocks.map((item) => {
              return <Grid.Column key={item}>
                  <Menu className="list-item" fluid vertical>
                  <Menu.Item onClick={() => this.props.deleteStock(socket, item)} className="header">{item}</Menu.Item>
                </Menu>
                </Grid.Column>;
            }) }
            <Grid.Column>
              <Menu fluid vertical>
                <div className="fluid ui input">
                  <input
                    ref={(input) => {
                      this.Input = input;
                    }}
                  />
                  <Button onClick={() => this.stock()}>Add Stock</Button>
                </div>

              </Menu>
            </Grid.Column>
          </Grid>
        </div>

       
          <h4 className="ui center aligned small header"><a href="https://github.com/zzhakupov/stocky-wocky" target="_blank">@zzhakupov</a></h4>

      </div>
    );
  }
}

Root.propTypes = {
  config: PropTypes.object,
  stocks: PropTypes.array,
  tryStock: PropTypes.func.isRequired,
  takeFresh: PropTypes.func.isRequired,
  placeNewStocks: PropTypes.func.isRequired,
  deleteStock: PropTypes.func.isRequired,
};

const WrappedRoot = connect(state => ({ config: state.config, stocks: state.stocks }), dispatch => ({
  tryStock: (socketInstance, name) => dispatch(tryStock(socketInstance, name)),
  placeNewStocks: res => dispatch(placeNewStocks(res)),
  takeFresh: socketInstance => dispatch(takeFresh(socketInstance)),
  deleteStock: (socketInstance, name) => dispatch(deleteStock(socketInstance, name)),
}))(Root);

export default WrappedRoot;
