import React, { useEffect, useState } from 'react'
import { fetchThreads, sendMessage } from '../Shared/Routes'
import { MdGroups } from 'react-icons/md'

import MessageSection from './MessageSection/MessageSection'
import CreateThreadSection from './CreateThreadSection/CreateThreadSection'


const Messages = () => {
    const [threads, setThreads] = useState([])
    const [selectedThread, setSelectedThread] = useState(null)
    const [selectedScreen, setSelectedScreen] = useState('messages')

    const fetchUserThreads = async () => {
        const [userThreads, status] = await fetchThreads()
        setThreads(userThreads)
        if (!selectedThread) {
            setSelectedThread(userThreads[0])
        } else {
            setSelectedThread(userThreads.find(thread => thread.thread_id === selectedThread.thread_id))
        }
        return userThreads
    }

    const handleThreadChange = (index) => {
        setSelectedScreen('messages')
        setSelectedThread(threads[index])
    }
    useEffect(() => {
        fetchUserThreads()
    }, [])


    return (
        <section>
            <div className='flex glass_morphism min-w-[744px] h-[calc(100vh-10rem)] min-h-[458px] w-full section_screen_height text-bgColor rounded-lg'>
                <div className='bg-primary  w-[20%] py-4 px-2 rounded-tl-lg rounded-bl-lg' >
                    <h2 className='font-bold xs:text-sm text-2xl flex items-center justify-center gap-2'><MdGroups /> Threads</h2>
                    <ul className='overflow-y-auto max-h-[calc(100%-4rem)] custom-scrollbar custom-scrollbar-bgColor'>
                        {
                            threads.length > 0 ? threads.map((thread, index) => {
                                return (
                                    <li key={thread.id} onClick={() => handleThreadChange(index)} className='mr-2 flex flex-col bg-bgColor text-primary rounded-full mt-2 px-4 py-2 cursor-pointer'>
                                        <p className='font-'>{thread.title}</p>
                                        <small className='text-[0.5rem] text-right'>{thread.created_at}</small>
                                    </li>
                                )
                            }) : <p className='mt-4 text-center'>No threads</p>
                        }
                        <li className='bg-bgColor w-12 text-white h-12 text-xl flex justify-center items-center rounded-[50%] relative left-[50%] translate-x-[-50%] mt-2 cursor-pointer transition-all hover:text-3xl' onClick={() => setSelectedScreen('create_thread')}>+</li>
                    </ul>
                </div>
                {
                    selectedScreen === 'messages' && <MessageSection selectedThread={selectedThread} fetchUserThreads={fetchUserThreads} />
                }
                {
                    selectedScreen === 'create_thread' && <CreateThreadSection fetchUserThreads={fetchUserThreads} />
                }
            </div>
        </section>
    )
}

export default Messages