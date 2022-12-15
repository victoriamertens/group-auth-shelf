

const shelfReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_Shelf':
            return action.payload;
        default:
            return state;
    }
};

export default shelfReducer;