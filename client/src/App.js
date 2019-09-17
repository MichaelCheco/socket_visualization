import React from 'react'
import socketIOClient from 'socket.io-client'
import './App.css'
import LineChartGraph from './LineChart'
import BarChartGraph from './BarChart'
const URL = 'http://localhost:3001/'
function App() {
	const [show, setShow] = React.useState(false)
	const[mostRecentVal,setMostRecent] = React.useState()
	const [userInput, set] = React.useState(0)
	const [barChartData, setBarChartData] = React.useState(seedBarChartData)
	const [lineChartData, setLineChartData] = React.useState(seedLineChartData)
	React.useEffect(() => {
		const socket = socketIOClient(URL)
		socket.on('data', data => {
			setMostRecent(float2int(data.value))
			if (userInput) {
				if (data.value > userInput) {
				setShow(true)
				}
			}
			let newLineEntry = updateLineChart(data)
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
			let newBarEntry = updateBarChart(data)
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
		{show && (
			<div className='snackbar'>
		Threshold  reached: {mostRecentVal} 
		<div className="close" onClick={() => setShow(false)}>×</div>
		</div>
		)}
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
				<LineChartGraph lineChartData={lineChartData} />
				<BarChartGraph barChartData={barChartData}/>
			</div>
		</>
	)
}
export default App

function updateLineChart(d) {
	let currentTime = new Date(float2int(d.timestamp))
	const getSeconds = date =>
		date
			.toLocaleTimeString()
	let timeEntry = getSeconds(currentTime)
	let newEntry = {
		value: float2int(d.value),
		timestamp: timeEntry,
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
const seedLineChartData = []
