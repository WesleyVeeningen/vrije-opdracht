"use client";
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import validate from 'validate.js';
import Link from 'next/link';

async function loginUser(email, password) {
    const res = await fetch('http://127.0.0.1:8090/api/collections/users/auth-with-password', {
        method: 'POST',
        body: JSON.stringify({
            identity: email,
            password: password,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        const data = await res.json();
        console.log("User logged in successfully:", data);
    } else {
        const errorData = await res.json();
        console.error("Error logging in:", errorData);
    }
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const constraints = {
        email: {
            presence: { allowEmpty: false },
            email: true
        },
        password: {
            presence: { allowEmpty: false },
            length: {
                minimum: 8,
                message: 'must be at least 8 characters'
            }
        }
    };


    const handleLogin = async () => {
        const validationErrors = validate({ email, password }, constraints);
        if (validationErrors) {
            setErrors(validationErrors);
            return;
        }
        await loginUser(email, password);
    };

    return (
        <main className="flex items-center justify-center w-full h-full">
            <div className="w-80 p-6 space-y-14 border-2 border-black rounded-lg">
                <h1 className="text-center text-2xl font-bold">Login</h1>
                <div className="space-y-5 text-start">
                    <Input
                        type="email"
                        placeholder="Email"
                        className="rounded-lg border-2 border-black w-full p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
                    <div>
                        <Input
                            type="password"
                            placeholder="Password"
                            className="rounded-lg border-2 border-black w-full p-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
                        <Link className='text-blue-700 text-xs hover:underline' href={"/forgot"} >Forgot your Password?</Link>
                    </div>
                </div>

                <div className='text-center space-y-2'>
                    <p>Dont have an account? <Link href={"/register"}>Sign Up</Link></p>
                    <Button variant="outline" onClick={handleLogin} className="w-full">Login</Button>
                </div>
            </div>
        </main >
    );
}
