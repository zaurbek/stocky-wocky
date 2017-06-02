export default (state = {}, action) => {
    switch (action.type) {
        case 'NEW_STOCKS':
            const names=[]
            action.payload.forEach(item=>{
                names.push(item.name);
            })
            return {
                stocks: names,
                config: {
                    ...state.config,
                    series: action.payload
                }
            }
        case 'TRY_STOCK':
            return {
                ...state,
                stocks: [...state.stocks, action.payload]
            }
        default:
            return state;
    }
};