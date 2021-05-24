import React from 'react'

function Winners({ winner }) {
    const [first, last, email] = winner;
    return (
        <>
            <div>
                <h3> {first} {last} {email}</h3>
            </div>
        </>
    )
}

export default Winners