import React from 'react'
import { render,fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../App'

const setup = () => {
    const utils = render(<App />)
    const input = utils.getByLabelText('input')
    return {
      input,
      ...utils,
    }
  }
  
  test('It should update the input properly', () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: '23' } })
    expect(input.value).toBe('23')
  })
  test('It should not show alert on initial render', () => {
    const {queryByLabelText} = setup()
    expect(queryByLabelText('snackbar')).not.toBeInTheDocument()
  })

  