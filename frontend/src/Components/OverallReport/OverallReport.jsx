import React from 'react'
import Circle from '../Circle/circle'

function OverallReport({ data }) {
    // console.log(data)
    return (
        <div style={{display:'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '70px'}}>
            {data && data.map((item, index) => {
                return <Circle key={index} skill={item.kpi_name} size={120} strokewidth={8} percentage={item.pivot.evaluation_kpi*10} color='#B82381' />
            })}
        </div>

        
    )
}

export default OverallReport