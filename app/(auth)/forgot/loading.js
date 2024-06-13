
import React from 'react';
import { MoonLoader } from 'react-spinners';

export default function Loading() {
    return (
        <div className='absolute h-screen w-screen items-center justify-center flex'>
            <MoonLoader
                color="#000000"
                size={60}
                speedMultiplier={1}
            />
        </div>
    )
}