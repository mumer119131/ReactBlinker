import React, { useEffect, useState } from 'react'
import { fetchThreads, sendMessage } from '../Shared/Routes'
import { MdGroups } from 'react-icons/md'
import { AiOutlineSend } from 'react-icons/ai'
import Message from './Message/Message'


const Messages = () => {
    const [threads, setThreads] = useState([])
    const [selectedThread, setSelectedThread] = useState(null)
    const [message, setMessage] = useState('')
    const msgRef = React.useRef()

    const fetchUserThreads = async () => {
        const [userThreads, status] = await fetchThreads()
        setThreads(userThreads)
        if (!selectedThread) {
            setSelectedThread(userThreads[0])
        } else {
            setSelectedThread(selectedThread)
        }
    }

    const handleThreadChange = (index) => {
        console.log(threads[index])
        setSelectedThread(threads[index])
    }
    useEffect(() => {
        fetchUserThreads()
    }, [])

    const sendUserMessage = async (e) => {
        e.preventDefault()
        const [response, status] = await sendMessage(message, selectedThread.thread_id)
        fetchUserThreads()
        setMessage('')
        console.log(response, status)
    }
    return (
        <section>
            <div className='flex glass_morphism min-w-[744px] w-full section_screem_height text-bgColor rounded-lg'>
                <div className='bg-primary  w-[20%] py-4 px-2 rounded-tl-lg rounded-bl-lg' >
                    <h2 className='font-bold xs:text-sm text-2xl flex items-center justify-center gap-2'><MdGroups /> Threads</h2>
                    <ul>
                        {
                            threads.length > 0 ? threads.map((thread, index) => {
                                return (
                                    <li key={thread.id} onClick={() => handleThreadChange(index)} className='flex flex-col bg-bgColor text-primary rounded-full mt-2 px-4 py-2 cursor-pointer'>
                                        <p className='font-'>{thread.title}</p>
                                        <small className='text-[0.5rem] text-right'>{thread.created_at}</small>
                                    </li>
                                )
                            }) : <p>{threads.length} No threads</p>
                        }
                    </ul>
                </div>
                <div className='bg-bgColor w-[80%] p-4 rounded-tr-lg rounded-br-lg relative'>
                    <div className='text-white h-[calc(100%-4rem)] flex flex-col justify-end items-end'>
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
            </div>
        </section>
    )
}

export default Messages