import * as React from 'react';
import { createContext, useReducer, ReactNode } from 'react';
import { LifeEventCategoryProp, EventProp } from '../Api/api';
import axios from 'axios';

interface Type {
    key: string;
    text: string;
}

interface Category {
    id: string;
    key: string;
    text: string;
    type: Type[];
}

interface Event {
    id: string;
    category: string;
    date: string;
    detail: string;
    type: string;
}

interface State {
    category: Category[];
    events: Event[];
}

interface Action {
    type: string;
    payload?: any;
}
interface AppContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}

const initialState: State = {
    category: [],
    events: [],
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_CATEGORY':
            return { ...state, category: action.payload };
        case 'SET_EVENTS':
            return { ...state, events: action.payload };
        case 'ADD_EVENT':
            return { ...state, events: [...state.events, action.payload] };
        case 'EDIT_EVENT':
            return {
                ...state,
                events: state.events.map(event => event.id === action.payload.id ? action.payload : event),
            };
        case 'DELETE_EVENT':
            return {
                ...state,
                events: state.events.filter(event => event.id !== action.payload),
            };
        default:
            return state;
    }
};

export const AppContext = createContext<AppContextProps>({
    state: initialState,
    dispatch: () => null,
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
   
    return (
        <AppContext.Provider value={{ state, dispatch}}>
            {children}
        </AppContext.Provider>
    );
};