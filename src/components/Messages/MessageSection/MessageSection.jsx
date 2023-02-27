import React, { useState } from 'react'
import { sendMessage } from '../../Shared/Routes'
import { AiOutlineSend } from 'react-icons/ai'
import Message from '../Message/Message'
const MessageSection = ({ selectedThread, fetchUserThreads }) => {

    const [message, setMessage] = useState('')
    const msgRef = React.useRef()

    const sendUserMessage = async (e) => {
        e.preventDefault()
        const [response, status] = await sendMessage(message, selectedThread.thread_id)
        fetchUserThreads()
        setMessage('')
        console.log(response, status)
    }
    return (
        <div className='bg-bgColor w-[80%] p-4 rounded-tr-lg rounded-br-lg relative'>
            <div className='text-white h-[calc(100%-4rem)] flex flex-col justify-end items-end overflow-auto'>
                {
                    selectedThread != null && selectedThread.messages.length > 0 ? selectedThread.messages.map((message) => {
                        return <Message key={message.id} message={message} />
                    })
                        : <p className='text-center self-center font-light'>No messages</p>}
                <div ref={msgRef}></div>
            </div>
            {/* <div className='flex items-center gap-2 h-[3rem] absolute bottom-4 w-[calc(100%-2rem)]'> */}
            <form className='flex items-center gap-2 h-[3rem] absolute bottom-4 w-[calc(100%-2rem)]' onSubmit={sendUserMessage}>
                <input type="text" className='px-4 outline-none grow h-full rounded-full' placeholder='Message...' value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type='submit' className='p-3 bg-white rounded-full cursor-pointer text-bgColor hover:bg-primary hover:text-white transition-all'><AiOutlineSend className='text-xl rounded-full ' /></button>
            </form>
            {/* </div> */}
        </div>
    )
}

export default MessageSection