import React from 'react';
import { MoonLoader } from 'react-spinners';

export default function Loading() {
    return (
        <div className='flex items-center justify-center h-screen w-screen'>
            <MoonLoader
                color="#000000"
                size={60}
                speedMultiplier={1}
            />
        </div>
    )
}
