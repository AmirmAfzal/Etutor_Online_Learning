"use client"
import React from 'react'

interface Props {
    error: Error;
    reset: () => void;
}

const ErrorPage = ({ reset }: Props) => {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <h1 className="text-7xl font-audiowide text-error">Error</h1>
            <p className="">An error occurred while loading the page</p> 
            <button className="btn btn-primary rounded-full px-8 mt-8" onClick={() => reset()}>Try Again</button>
        </div>
    )
}

export default ErrorPage
