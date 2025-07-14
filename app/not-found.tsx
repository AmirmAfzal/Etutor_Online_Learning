"use client"
import Link from 'next/link';
import React from 'react'

const ErrorPage = () => {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <h1 className="text-7xl font-audiowide text-error">404</h1>
            <p className="">Page not found</p> 
            <Link href={"/"} className="btn btn-primary rounded-full px-8 mt-8">Back to Home Page</Link>
        </div>
    )
}

export default ErrorPage
