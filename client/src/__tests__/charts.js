import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LineChartGraph from '../LineChart'
import BarChartGraph from '../BarChart'
import { seedBarChartData, seedLineChartData } from '../constants'
const LineChartSetup = () => {
    const utils = render(<LineChartGraph />)
    const loadingText = utils.queryByTestId('loading')
    return {
      ...utils,
      loadingText
    }
  }
const BarChartSetup = () => {
    const utils = render(<BarChartGraph />)
    const loadingText = utils.queryByTestId('loading-bar')
    return {
      ...utils,
      loadingText
    }
  }
  
  
  test('Line Chart should render loading when data is not passed in', () => {
    const {loadingText,rerender} = LineChartSetup()
    
    expect(loadingText).toBeInTheDocument()
    rerender(<LineChartGraph lineChartData={seedLineChartData}/>)
    expect(loadingText).not.toBeInTheDocument()
  })

  test('Bar Chart should render loading when data is not passed in', () => {
  const {loadingText,rerender} = BarChartSetup()
    expect(loadingText).toBeInTheDocument()
    rerender(<BarChartGraph barChartData={seedBarChartData}/>)
    expect(loadingText).not.toBeInTheDocument()
  })