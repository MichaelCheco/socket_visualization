import React from 'react'
import socketIOClient from 'socket.io-client'
import './App.css'
import LineChartGraph from './LineChart'
import BarChartGraph from './BarChart'
import {URL, seedBarChartData, seedLineChartData} from './constants'
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
			if (userInput && Math.abs(mostRecentVal) > userInput) {
				setShow(true)
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
		
	}, [barChartData, lineChartData, mostRecentVal, userInput])
	
	return (
		<>
		{show && (
			<div className='snackbar' aria-label='snackbar'>
		Threshold  reached: {mostRecentVal} 
		<div className="close" onClick={() => setShow(false)}>×</div>
		</div>
		)}
			<header>
				Enter an Alert Threshold:
				<input
				    aria-label="input"
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
