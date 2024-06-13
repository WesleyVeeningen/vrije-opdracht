"use client";
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import validate from 'validate.js';
import Link from 'next/link';

async function requestPasswordReset(email) {
    console.log("Requesting password reset for email:", email);
    console.log("Sending request to server...");
    const res = await fetch('http://127.0.0.1:8090/api/collections/users/request-password-reset', {
        method: 'POST',
        body: JSON.stringify({ email: email }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.status === 204) {
        console.log("Password reset requested successfully.");
    } else {
        const errorData = await res.json();
        console.error("Error requesting password reset:", errorData);
    }
}

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    console.log(email, "email");

    const constraints = {
        email: {
            presence: { allowEmpty: false },
            email: true
        }
    };

    const handleRequestReset = async () => {
        const validationErrors = validate({ email }, constraints);
        if (validationErrors) {
            setErrors(validationErrors);
            return;
        }
        await requestPasswordReset(email);
    };

    return (
        <main className="flex items-center justify-center w-full h-full">
            <div className="w-80 p-6 space-y-14 border-2 border-black rounded-lg">
                <h1 className="text-center text-2xl font-bold">Forgot Password</h1>
                <div className="space-y-5">
                    <Input
                        type="email"
                        placeholder="Email"
                        className="rounded-lg border-2 border-black w-full p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
                </div>

                <div className='text-center'>
                    <p>Remembered your password? <Link href={"/login"}>Login</Link></p>
                    <Button variant="outline" onClick={handleRequestReset} className="w-full">Request Reset</Button>
                </div>
            </div>
        </main>
    );
}
