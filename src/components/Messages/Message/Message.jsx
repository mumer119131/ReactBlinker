import { motion } from 'framer-motion'
import React from 'react'

const Message = ({ key, message }) => {
    return (
        <motion.div initial={{ x: "100%" }}
            animate={{ x: "0" }}
            className='bg-primary mt-2 w-max px-4 py-2 rounded-lg relative mr-2' key={key}>
            <h2>{message.body}</h2>
        </motion.div>
    )
}

export default Message