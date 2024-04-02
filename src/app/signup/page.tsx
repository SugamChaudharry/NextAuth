"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const onSignup = async (event:any) => {
    event.preventDefault();

    try {
      
      setLoading(true);
      const response  = await axios.post("/api/users/signup", user);
      router.push("/login");
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
          {loading ? "Processing..." : "Signup"}
        </h1>
        <input
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
          className="p-3 border border-gray-300 rounded-md mb-6 text-black"
        />
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
          onClick={onSignup}
          disabled={buttonDisabled}
          className="bg-cyan-600 w-20 p-2 rounded-lg mb-4 "
        >
          signup
        </button>
        <Link href="/login">Visit login page </Link>
      </form>
    </div>
  );
}


