import axios from "axios";
import { useContext } from "react";
import { AppProvider, AppContext } from "../Context/eventContext"
import { eventUseContext } from "../Context/eventUseContext";
// import { LifeEventCategoryProp } from "../DummyData/categoryData";

interface Item {
    key: string,
    text: string,
}

export interface LifeEventCategoryProp {
    id: string
    key: string,
    text: string,
    type: Item[]
}

export interface EventProp {
    id?: string,
    category: string,
    type: string,
    detail: string,
    date: string,
}

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

export const postData = async (data: EventProp) => {
    try {
        const response = await axios.post("http://localhost:3001/events/", data)
        console.log(response.data)
        return response.data
        
    } catch (error) {
        console.error("Error fetching post:", error)
    }
}

export const editData = async (data: EventProp) => {
    try {
        const response = await axios.put(`http://localhost:3001/events/${data.id}`, data)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error("Error deleting:", error)
    }
}

export const deleteData = async (id: string) => {
    try {
        const response = await axios.delete(`http://localhost:3001/events/${id}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error("Error deleting:", error)
    }
}

