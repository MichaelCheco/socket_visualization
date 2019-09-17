import React from 'react'
import {
    XAxis,
    BarChart,
    Bar,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts'


const BarChartGraph = ({barChartData}) => {
    return (
        <BarChart width={495} height={400} data={barChartData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="range" />
					<YAxis
						dataKey="amount"
						label={{ value: 'frequency', angle: -90, position: 'insideLeft' }}
					/>
					<Tooltip />
					<Legend />
					<Bar dataKey="amount" fill="#3291FF" />
				</BarChart>
    )
}

export default BarChartGraph
