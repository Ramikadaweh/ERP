import React from 'react'
import './IndividualReport.css'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function IndividualReport({ data }) {
    const chartData = [];
    data.forEach(singleData => {
        var dateObj = new Date(singleData.created_at);
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        let newdate = year + "/" + month + "/" + day;
        chartData.push({ name: newdate, rating:singleData.evaluation*10, pv: 2400, amt: 2400 })
    });
    // console.log(data)
    return (
        <div className="chart-res">
            <LineChart width={600} height={300} data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="rating" stroke="#8884d8" strokeWidth={4}/>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>

        </div>
    )
}

export default IndividualReport