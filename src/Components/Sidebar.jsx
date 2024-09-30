import React from 'react'
import './Mystyles/Style.css'
const Sidebar = () => {
    return (
        <div className='bg-white sidebar p-2'>
            <div className='m-2'>
                <i className='bi bi-bootstrap-fill fs-4 me-3'></i>
                <span className='brand-name fs-4 b_name'>Dashboard</span>
            </div>
            <hr className='text-dark' />
            <div className="list-group list-group-flush">
                <div>
                    <a href="employee" class="btn btn-dark mb-2">Add Employee</a>
                </div>
                <a className='list-group-item py-2' href="/">
                    <i className='bi bi-house fs-5 me-3'></i>
                    <span className='fs-5' >Home</span>
                </a>
                <a className='list-group-item py-2' href="">
                    <i className='bi bi-table fs-5 me-3 '></i>
                    <span className='fs-5' >Product</span>
                </a>
                <a className='list-group-item py-1' href="">
                    <i className='bi bi-clipboard-data fs-5 me-3'></i>
                    <span className='fs-5' >Report</span>
                </a>
                <a className='list-group-item py-1' href="">
                    <i className='bi bi-people fs-5 me-3'></i>
                    <span className='fs-5' >Customer</span>
                </a>
                <a className='list-group-item py-2' href="">
                    <i className='bi bi-power fs-5 me-3 '></i>
                    <span className='fs-5'>Logout</span>
                </a>

            </div>
        </div>
    )
}

export default Sidebar
