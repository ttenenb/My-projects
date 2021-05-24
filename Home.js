import './Home.css';
import React from 'react';

function Home() {
    return (
        <>
            <div className='m-3'>
                <div className='float-left'>
                    <figure>
                        <img className='rounded img-thumbnail img-fluid mr-3' src='../IMG_953_ws.JPG' alt='pic' />
                        <figcaption className='p-2 cap'>Tzvi Tenenbaum</figcaption>
                    </figure>
                </div>
                <p className=' aboutMe'>
                    I finished an extensive 18 month course in software development/ web development in <a href="https://www.linkedin.com/school/theschoolofevolvingtechnologies/about/" target="_blank" rel="noopener noreferrer"> The School of Evolving Technologies </a>(2019-2021). I thrive having a challenge to tackle and I especially enjoy working in a group.  I have my certificate in software development/ web development from The School of Evolving Technologies.
                </p>

                <div>You can reach me either through LinkedIn <a href='https://www.linkedin.com/in/tzvi-tenenbaum-8793a21b2/' target="_blank" rel="noopener noreferrer">here</a>.
                Or you can email me at <a href='https://mail.google.com/mail/?view=cm&fs=1&to=tenenbaumtzvi@gmail.com' target="_blank" rel="noopener noreferrer">tenenbaumtzvi@gmail.com</a>.</div>
                <div className='m-3'>
                    <img className='App-logo' src='../8093f109675f4f7aac6b62f930ac0291 (5).png' alt='pic' />
                </div>
            </div>
        </>
    )
}

export default Home
