
const TRY_STOCK = 'TRY_STOCK';

const loser = name => ({
  type: TRY_STOCK,
  payload: name,
});

export const tryStock = (socket, name) => (dispatch) => {
  socket.emit('tryStock', name);
  return dispatch(loser(name));
};

export const takeFresh = (socket) => dispatch => {
  socket.emit('takeFresh');
};

export const NEW_STOCKS = 'NEW_STOCKS';

export const placeNewStocks = res => ({
  type: NEW_STOCKS,
  payload: res,
});


export const DELETE_STOCK = 'DELETE_STOCK';

const removeStock = name => ({
    type: 'REMOVE_STOCK',
    payload: name
})


export const deleteStock = (socket, name) => dispatch => {
  socket.emit('deleteStock',name);
  return dispatch(removeStock)
}
