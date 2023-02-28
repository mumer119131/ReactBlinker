import React from 'react'

const CreateThreadSection = () => {
    return (
        <div className='bg-bgColor w-[80%] p-4 rounded-tr-lg rounded-br-lg relative text-white flex flex-col gap-4 justify-center items-center'>
            <h2 className='text-2xl font-bold tracking-wider text-primary'>Create Thread</h2>
            <form >
                <input type="text" className='text-bgColor py-3 px-4 border-0 rounded-lg outline-none' placeholder='Thread name...' />
            </form>
        </div>
    )
}

export default CreateThreadSection