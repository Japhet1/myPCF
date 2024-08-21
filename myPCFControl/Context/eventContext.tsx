import * as React from 'react';
import { createContext, useReducer, ReactNode } from 'react';
import { getOptionSet, IChoice } from 'pcf-core';
import { choiceColumn, fetchxml, filterAnd, orderBy } from 'fetchxml4js';
import { EventTable, EventRecord } from '../model';

const SET_CATEGORY = 'SET_CATEGORY';
const SET_EVENTS = 'SET_EVENTS';
const ADD_EVENT = 'ADD_EVENT';
const EDIT_EVENT = 'EDIT_EVENT';
const DELETE_EVENT = 'DELETE_EVENT';


interface Type {
    key: string;
    text: string;
}

export interface Event {
    Id?: string;
    new_category: string;
    new_date: string;
    new_detail: string;
    new_eventtype: string;
}

interface State {
    category: IChoice[];
    events: EventRecord[];
}

export const setCategory = (categories: IChoice[]): Action => ({
    type: SET_CATEGORY,
    payload: categories,
});

export const setEvents = (events: EventRecord[]): Action => ({
    type: SET_EVENTS,
    payload: events,
});

export const addEvent = (event: EventRecord): Action => ({
    type: ADD_EVENT,
    payload: event,
});

export const editEvent = (event: EventRecord): Action => ({
    type: EDIT_EVENT,
    payload: event,
});

export const deleteEvent = (eventId: string): Action => ({
    type: DELETE_EVENT,
    payload: eventId,
});


interface Action {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                events: state.events.map(event => event.Id === action.payload.id ? action.payload : event),
            };
        case 'DELETE_EVENT':
            return {
                ...state,
                events: state.events.filter(event => event.Id !== action.payload),
            };
        default:
            return state;
    }
};

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(EventReducer, initialState);

    
   
    return (
        <AppContext.Provider value={{ state, dispatch}}>
            {children}
        </AppContext.Provider>
    );
};