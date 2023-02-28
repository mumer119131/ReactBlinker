import React, { useState } from 'react'
import { createThread } from '../../Shared/Routes'

const CreateThreadSection = ({ fetchUserThreads }) => {
    const [threadName, setThreadName] = useState('')
    const [error, setError] = useState('')

    const createUserThread = async (e) => {
        e.preventDefault()
        const [thread, status] = await createThread(threadName)
        if (status === 404) {
            return setError(thread)
        }
        await fetchUserThreads()
        console.log(thread, status)
    }
    return (
        <div className='bg-bgColor w-[80%] p-4 rounded-tr-lg rounded-br-lg relative text-white flex flex-col gap-4 justify-center items-center'>
            <h2 className='text-3xl font-bold tracking-wider text-primary'>Create Thread</h2>
            <form className='flex flex-col gap-2 items-center' onSubmit={createUserThread}>
                <p className='text-light text-primary'>{error}</p>
                <input type="text" className='text-bgColor w-[30rem] py-3 px-4 border-0 rounded-lg outline-none' placeholder='Thread name...' value={threadName} onChange={(e) => setThreadName(e.target.value)} />
                <button className='bg-primary w-[20rem] py-4 tracking-wider px-4 text-white rounded-lg uppercase hover:tracking-widest hover:text-bgColor hover:font-bold transition-all' type='submit'>Create Thread</button>
            </form>
        </div>
    )
}

export default CreateThreadSection