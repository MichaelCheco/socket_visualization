import React from 'react'
import socketIOClient from 'socket.io-client'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	Bar,
	BarChart,
} from 'recharts'
import './App.css'
const URL = 'http://localhost:3001/'
function App() {
	const [userInput, set] = React.useState(0)
	const [barChartData, setBarChartData] = React.useState(seedBarChartData)
	const [lineChartData, setLineChartData] = React.useState(seedLineChartData)
	React.useEffect(() => {
		const socket = socketIOClient(URL)
		socket.on('data', d => {
			let newInput
			if (userInput) {
				if (d.value > userInput) {
					newInput = prompt(
						`${float2int(
							d.value
						)} is greater than your chosen threshold: ${userInput}. Choose a new value.`
					)
					newInput ? set(newInput) : set(0)
				}
			}
			let newLineEntry = updateLineChart(d)
			function updateBarChart({ value }) {
				let newVal = float2int(value)
				let updated = barChartData.map(({ range, amount }) => {
					if (range <= newVal && newVal <= range + 10) {
						return { range, amount: amount + 1 }
					}
					return { range, amount }
				})
				return updated
			}
			let newBarEntry = updateBarChart(d)
			setLineChartData([...lineChartData, newLineEntry])
			setBarChartData([...newBarEntry])
		})
		return () => socket.close()
	}, [barChartData, lineChartData, userInput])
	if (!lineChartData) {
		return <p>Loading....</p>
	}
	return (
		<>
			<header>
				Enter an Alert Threshold:
				<input
					value={userInput}
					onChange={e =>
						Number(e.target.value) >= 0 ? set(Number(e.target.value)) : set(0)
					}
				/>
			</header>
			<div className="App">
				<div className="test">
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
				</div>
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
			</div>
		</>
	)
}
export default App
const round5 = x => Math.ceil(x / 5) * 5

function updateLineChart(d) {
	let currentTime = new Date(float2int(d.timestamp))
	const getSeconds = date =>
		date
			.toLocaleTimeString()
			.split(' ')[0]
			.slice(5, 7)
	let timeEntry = getSeconds(currentTime)
	let newEntry = {
		value: float2int(d.value),
		timestamp: round5(Number(timeEntry)),
	}
	return newEntry
}

const float2int = val => val | 0
const seedBarChartData = [
	{ range: 10, amount: 0 },
	{ range: 20, amount: 0 },
	{ range: 30, amount: 0 },
	{ range: 40, amount: 0 },
	{ range: 50, amount: 0 },
	{ range: 60, amount: 0 },
	{ range: 70, amount: 0 },
	{ range: 80, amount: 0 },
	{ range: 90, amount: 0 },
	{ range: 100, amount: 0 },
	{ range: 0, amount: 0 },
	{ range: -10, amount: 0 },
	{ range: -20, amount: 0 },
	{ range: -30, amount: 0 },
	{ range: -40, amount: 0 },
	{ range: -50, amount: 0 },
	{ range: -60, amount: 0 },
	{ range: -70, amount: 0 },
	{ range: -80, amount: 0 },
	{ range: -90, amount: 0 },
	{ range: -100, amount: 9 },
]
const seedLineChartData = [
	{ value: 0, timestamp: 0 },
	{ value: 0, timestamp: 0 },
	{ value: 0, timestamp: 0 },
	{ value: 0, timestamp: 0 },
	{ value: 0, timestamp: 0 },
	{ value: 0, timestamp: 5 },
	{ value: 0, timestamp: 10 },
	{ value: 0, timestamp: 15 },
	{ value: 0, timestamp: 20 },
	{ value: 0, timestamp: 25 },
	{ value: 0, timestamp: 30 },
	{ value: 0, timestamp: 35 },
	{ value: 0, timestamp: 40 },
	{ value: 0, timestamp: 45 },
	{ value: 0, timestamp: 50 },
	{ value: 0, timestamp: 55 },
	{ value: 0, timestamp: 60 },
]
