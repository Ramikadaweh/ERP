import React from 'react'
import './table.css'
function Table({ employeeName, projectName, role, startDate }) {
    return (
        <li className="table-row">
            <div className="col col-1" data-label="Employee name">{employeeName}</div>
            <div className="col col-2" data-label="Project Name">{projectName}</div>
            <div className="col col-3" data-label="Role">{role}</div>
            <div className="col col-4" data-label="Start date">{startDate}</div>
        </li>

    )
}

export default Table