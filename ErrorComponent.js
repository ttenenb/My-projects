import './ErrorComponent.css'
import React, { useEffect } from 'react';

function Error({ error, setError }) {
    useEffect(() => {
        const timer = setTimeout(() => setError(null), 5000)
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    return (
        <>
            <div className='fixed-top fixed-left fixed-bottom p-5 background-error'>

                <div className='err'>
                    <h1 className='text-danger p-3'>
                        {error.toUpperCase()}
                    </h1>
                    <button onClick={() => setError(null)}>OK</button>
                </div>
            </div>
        </>
    )
}

export default Error
