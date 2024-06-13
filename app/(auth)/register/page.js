"use client";
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import validate from 'validate.js';
import Link from 'next/link';

async function createUser(email, name, password, confirmPassword) {
    const res = await fetch('http://127.0.0.1:8090/api/collections/users/records', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            passwordConfirm: confirmPassword
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        const data = await res.json();
        console.log("User created successfully:", data);
    } else {
        const errorData = await res.json();
        console.error("Error creating user:", errorData);
    }
}

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const constraints = {
        email: {
            presence: { allowEmpty: false },
            email: true
        },
        name: {
            presence: { allowEmpty: false },
        },
        password: {
            presence: { allowEmpty: false },
            length: {
                minimum: 8,
                message: 'must be at least 8 characters'
            }
        },
        confirmPassword: {
            equality: {
                attribute: 'password',
                message: 'does not match password'
            }
        }
    };

    const handleRegister = async () => {
        const validationErrors = validate({ email, name, password, confirmPassword }, constraints);
        if (validationErrors) {
            setErrors(validationErrors);
            return;
        }
        await createUser(email, name, password, confirmPassword);
    };

    return (
        <main className="flex items-center justify-center w-full h-full">
            <div className="w-80 p-6 space-y-14 border-2 border-black rounded-lg">
                <h1 className="text-center text-2xl font-bold">Register</h1>
                <div className="space-y-5">
                    <Input
                        type="email"
                        placeholder="Email"
                        className="rounded-lg border-2 border-black w-full p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
                    <Input
                        type="text"
                        placeholder="Name"
                        className="rounded-lg border-2 border-black w-full p-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
                    <Input
                        type="password"
                        placeholder="Password"
                        className="rounded-lg border-2 border-black w-full p-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        className="rounded-lg border-2 border-black w-full p-2"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword[0]}</p>}
                </div>

                <div className='text-center space-y-2'>
                    <p>Already have an account? <Link href={"/login"}>Login</Link></p>
                    <Button variant="outline" onClick={handleRegister} className="w-full">Register</Button>
                </div>
            </div>
        </main>
    );
}
