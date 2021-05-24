import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
    return (
        <>
            <div className='text-danger p-5'>
                <h2>404...Page not found</h2>
            </div>
            <Link to='home'><h3>Home</h3></Link>
        </>
    )
}

export default PageNotFound
