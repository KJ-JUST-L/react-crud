import React from 'react'
import { Link } from 'react-router-dom'

function Header({ text, path }) {
    const displayText = text?? <span><i className="bi bi-caret-left-fill"></i> Back</span>;
    const displayPath = path?? '/';

    return (
        <header className='mb-6 flex justify-between items-center'>
            <h1 className='font-bold mb-0'>CRUD System</h1>
            <div className='join'>
                <Link to={displayPath} className='btn btn-sm btn-primary join-item'>{displayText}</Link>
            </div>
        </header>
    )
}

export default Header