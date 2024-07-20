'use client'
import { Toaster } from 'react-hot-toast';

const ToasterProvider = () => {
    return (
        <Toaster toastOptions={{
            duration: 5000,
            position: "top-center",
            style: {
                borderRadius: '2rem',
                background: '#333',
                color: '#fff',
            },
        }} />
    )
}

export default ToasterProvider