import * as React from 'react';
import { createContext, useReducer, ReactNode } from 'react';
import { LifeEventCategoryProp, EventProp } from '../Api/api';
import axios from 'axios';

const SET_CATEGORY = 'SET_CATEGORY';
const SET_EVENTS = 'SET_EVENTS';
const ADD_EVENT = 'ADD_EVENT';
const EDIT_EVENT = 'EDIT_EVENT';
const DELETE_EVENT = 'DELETE_EVENT';



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

export interface Event {
    id?: string;
    category: string;
    date: string;
    detail: string;
    type: string;
}

interface State {
    category: Category[];
    events: Event[];
}

const setCategory = (categories: Category[]): Action => ({
    type: SET_CATEGORY,
    payload: categories,
});

const setEvents = (events: Event[]): Action => ({
    type: SET_EVENTS,
    payload: events,
});

export const addEvent = (event: Event): Action => ({
    type: ADD_EVENT,
    payload: event,
});

export const editEvent = (event: Event): Action => ({
    type: EDIT_EVENT,
    payload: event,
});

export const deleteEvent = (eventId: string): Action => ({
    type: DELETE_EVENT,
    payload: eventId,
});


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

const EventReducer = (state: State, action: Action): State => {
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

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(EventReducer, initialState);

    React.useEffect(() => {
        const getData = async () => {
            try {
                const categories = await axios.get<Category[]>("http://localhost:3001/category/")
                const events = await axios.get<Event[]>("http://localhost:3001/events/")
                dispatch(setCategory(categories.data));
                dispatch(setEvents(events.data));
            } catch (error) {
                console.error(error)
            }
            
        };
      
        getData();
    },[dispatch])
   
    return (
        <AppContext.Provider value={{ state, dispatch}}>
            {children}
        </AppContext.Provider>
    );
};