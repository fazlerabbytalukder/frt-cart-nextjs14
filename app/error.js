'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='container mx-auto'>
            <div className='flex justify-center items-center py-56'>
                <div className='flex flex-col items-center'>
                    <h2 className='text-3xl text-red-600 text-center'>Something went wrong!</h2>
                    <h2 className='text-xl text-gray-800 text-center my-3'>{error?.message}</h2>
                    <button
                        className='bg-green-900 text-white px-3 py-2 text-xl rounded'
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    )
}