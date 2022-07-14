import React from 'react'
import Table from '../Table/Table'

function ProjectReport({ data, employee }) {
    // console.log(data)
    return (

        <div id="table">
            <div className="container">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">Employee name</div>
                        <div className="col col-2">Project Name</div>
                        <div className="col col-3">Role</div>
                        <div className="col col-4">Start date</div>
                    </li>
                    {data && data.map((item, index) => {
                        var dateObj = new Date(item.created_at);
                        var month = dateObj.getUTCMonth() + 1; //months from 1-12
                        var day = dateObj.getUTCDate();
                        var year = dateObj.getUTCFullYear();
                        let newdate = year + "/" + month + "/" + day;
                        return <Table key={index} employeeName={employee} projectName={item.project_name} role={item.role_name} startDate={newdate} />
                    })}
                </ul>
            </div>
        </div>
        // <div>
        // {data && data.map((item, index) => {
        //     return <Table key={index} employeeName='await' projectName={item.project_name} role={item.role_name} startDate={item.created_at} />
        // })}
        // </div>
    )
}

export default ProjectReport