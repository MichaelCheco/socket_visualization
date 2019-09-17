import React from 'react'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts'
const LineChartGraph = ({lineChartData}) => {
    return (
            <LineChart width={495} height={400} data={lineChartData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey="timestamp"
							tickCount={12}
							minTickGap={5}
							allowDuplicatedCategory={false}
						/>
						<YAxis
							dataKey="value"
							label={{ value: 'values', angle: -90, position: 'insideLeft' }}
						/>
						<Tooltip />
						<Legend />
						<Line
							type="monotone"
							dataKey="value"
							stroke="#FF1A1A"
							name="value"
							activeDot={{ r: 8 }}
						/>
					</LineChart>
    )
}

export default LineChartGraph
