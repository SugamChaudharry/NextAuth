"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const onLogin = async (event:any) => {
    event.preventDefault();

    try {
      
      setLoading(true);
      const response  = await axios.post("/api/users/login", user);
      router.push("/profile");
      console.log("response", response.data);
      
    } catch (error: any) {
      console.log("error", error.message);

      toast.error(error.message);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form className="h-2/3 flex flex-col justify-between items-center">
        <h1 className="text-2xl font-bold text-center mb-8">
          {loading ? "Processing..." : "login"}
        </h1>
        <input
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
          className="p-3 border border-gray-300 rounded-md mb-6 text-black"
        />
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
          className="p-3 border border-gray-300 rounded-md mb-6 text-black"
        />
        <button
          onClick={onLogin}
          disabled={buttonDisabled}
          className="bg-cyan-600 w-20 p-2 rounded-lg mb-4 "
        >
          login
        </button>
        <Link href="/signup"><span className="text-blue-600">signup</span> if not alrady</Link> 
        
      </form>
    </div>
  );
}


