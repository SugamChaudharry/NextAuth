"use client";
import axios from 'axios';
import { set } from 'mongoose';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import React, { use, useEffect, useState } from 'react'

export default function verifyEmailPage() {

    // const router = useRouter()

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token })
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log("error", error.response.data)
        }
    }

    useEffect(() => {
        setError(false)
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")

        // const { query } = router
        // if (query.token) {
        //     setToken(query.token as string)
        // }

    }, [])

    useEffect(() => {
        setError(false)
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

  return (
    <div className='flex justify-center items-center min-h-screen'>
        {verified &&
         <h1>Email verified successfully</h1>
        }
        {verified && <Link className='text-blue-700 m-6' href="/login">Login</Link>}
        {token.length === 0 && <h1>Verifying email...</h1>}
        {error && <h1>Failed to verify email</h1>}
        
    </div>
  )
}
