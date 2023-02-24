import React from 'react'

const Message = ({ key, message }) => {
    return (
        <div className='bg-primary mt-2 w-max px-4 py-2 rounded-lg' key={key}>
            <h2>{message.body}</h2>
        </div>
    )
}

export default Message