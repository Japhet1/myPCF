import axios from "axios";
import { useContext } from "react";
// import { EventContextProvider, EventContext } from "../Context/eventContext"
// import { LifeEventCategoryProp } from "../DummyData/categoryData";

export interface LifeEventCategoryProp {
    id: string
    key: string,
    text: string,
    type: any[]
}

export interface EventProp {
    id: string,
    category: string,
    type: string,
    detail: string,
    date: string,
}

// const { state, dispatch } = useContext(EventContext)

export const fetchCategory = async (): Promise<LifeEventCategoryProp[]> => {
    try {
        const response = await axios.get("http://localhost:3001/category/")
        // dispatch({ type: 'SET_CATEGORY', payload: response.data });
        // console.log(response.data)
        return response.data
    } catch (error) {
        console.error("Error fetching post:", error)
    }
}

export const fetchData = async (): Promise<EventProp[]> => {
    try {
        const response = await axios.get("http://localhost:3001/events/")
        // dispatch({ type: 'SET_EVENTS', payload: response.data });
        // console.log(response.data)
        return response.data
    } catch (error) {
        console.error("Error fetching post:", error)
    }
}

export const postData = async (data: any) => {
    try {
        const response = await axios.post("http://localhost:3001/events/", data)
        console.log(response.data)
        return response.data
        
    } catch (error) {
        console.error("Error fetching post:", error)
    }
}

