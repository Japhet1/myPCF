import axios from "axios";

export interface EventProp {
    id: string,
    category: string,
    type: string,
    detail: string,
    date: string,
}


export const fetchData = async (): Promise<EventProp[]> => {
    try {
        const response = await axios.get("http://localhost:3001/events/")
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error("Error fetching post:", error)
    }
}

export const postData = async (data: any) => {
    try {
        const response = await axios.post("http://localhost:3001/events/", data)
        console.log(response.data)
        // return response.data
        
    } catch (error) {
        console.error("Error fetching post:", error)
    }
}

