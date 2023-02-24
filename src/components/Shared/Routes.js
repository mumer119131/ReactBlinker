import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");
const baseUrl = "http://localhost:5000/api/";



// fetch threads from the api get-threads
export const fetchThreads = async () => {
    try {
        const response = await axios.get(`${baseUrl}get-threads`, {
            headers: {
                'x-access-token': token
            }
        })

        console.log(response)
        return [response.data.data, response.status]
    } catch (error) {
        if (error.response) {
            return [error.response.data.message, 404]
        }
        return error
    }
}

// send message
export const sendMessage = async (message, threadId) => {
    try {
        const formData = new FormData()
        formData.append("body", message)
        formData.append("thread_id", threadId)
        const response = await axios.post(`${baseUrl}send-message`, formData, {
            headers: {
                'x-access-token': token
            }
        })
        return [response.data, response.status]
    } catch (error) {
        if (error.response) {
            return [error.response.data.message, 404]
        }
        return error
    }
}
