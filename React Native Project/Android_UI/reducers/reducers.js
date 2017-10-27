import {combineReducers} from 'redux';

const initialState={
    data: [
        {
            textContent: 'Question 1',
            showInnerContent: false,
            innerContent: 'This is some sample text.'
        },
        {
            textContent: 'Question 2',
            showInnerContent: false,
            innerContent: 'This is some sample text.'
        },
        {
            textContent: 'Question 3',
            showInnerContent: false,
            innerContent: 'This is some sample text.'
        },
        {
            textContent: 'Question 4',
            showInnerContent: false,
            innerContent: 'This is some sample text.'
        },
        {
            textContent: 'Question 5',
            showInnerContent: false,
            innerContent: 'This is some sample text.'
        },
        {
            textContent: 'Question 6',
            showInnerContent: false,
            innerContent: 'This is some sample text.'
        },
        {
            textContent: 'Question 7',
            showInnerContent: false,
            innerContent: 'This is some sample text.'
        },
        {
            textContent: 'Question 8',
            showInnerContent: false,
            innerContent: 'This is some sample text.'
        },
        {
            textContent: 'Question 9',
            showInnerContent: false,
            innerContent: 'This is some sample text.'
        },
        {
            textContent: 'Question 10',
            showInnerContent: false,
            innerContent: 'This is some sample text.'
        },
        {
            textContent: 'Question 11',
            showInnerContent: false,
            innerContent: 'This is some sample text.'
        }
    ]
};

function allReducers(state=initialState, action) {
    switch(action.type) {
        case "TOGGLE_INNER_CONTENT": {
            return Object.assign({}, state, {
                data: state.data.map((item, index) => {
                    if(index === action.payload) {
                        return Object.assign({}, item, {
                            showInnerContent: !item.showInnerContent
                        });
                    }
                    return item;
                })
            })
        }
        default: {
            return state;
        }
    }
}

export const reducers = combineReducers({
    reducer: allReducers
});