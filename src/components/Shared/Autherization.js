import axios from "axios"



export const loginUser = async (email, password) => {
    try {
        const formData = new FormData()
        formData.append("email", email)
        formData.append('password', password)
        const response = await axios.post("http://localhost:5000/api/login", formData)
        return [response.data, response.status]

    } catch (error) {
        if (error.response) {
            return [error.response.data.message, 404]
        }
        return error
    }
}

export const registerUser = async (username, email, password, confirmPassword) => {
    try {
        const formData = new FormData()
        formData.append("username", username)
        formData.append("email", email)
        formData.append('password', password)
        formData.append('confirmPassword', confirmPassword)
        const response = await axios.post("http://localhost:5000/api/register", formData)
        return [response.data.message, response.status]

    } catch (error) {
        if (error.response) {
            return [error.response.data.message, 404]
        }
        return error
    }
}

export const logoutUser = async () => {
    try {

        const response = await axios.get("http://localhost:5000/api/logout")
        return [response.data.message, response.status]

    } catch (error) {
        if (error.response) {
            return [error.response.data.message, 404]
        }
        return error
    }
}