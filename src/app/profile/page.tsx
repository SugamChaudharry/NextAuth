'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'


export default function page() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    
    const fetchData = async () => {
        try {
            const res = await axios.post("/api/users/me")
            console.log(res.data.data)
            setData(res.data.data._id)
        } catch (error) {
            toast.error("Error")
        }
    }

    const logout = async () => {
      try {
        await axios.get("/api/users/logout")
        toast.success("Logged out")
        router.push("/login")
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message)
      }
    }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div>
        
        <h1 className='m-4'>Profile</h1>
        
        <h2 className='m-4'>{ data == "nothing" ? "user not login" :
            <Link href={`/profile/${data}`}>
            {data}  
            </Link>}
        </h2>
        
        <button className='m-4 w-32 bg-cyan-600 p-2 rounded-lg mb-4 ' onClick={fetchData}>Fetch Data</button>
        
        <button className='m-4 bg-cyan-600 w-20 p-2 rounded-lg mb-4 ' onClick={logout}>Logout</button>
      </div>
    </div>
  )
}
