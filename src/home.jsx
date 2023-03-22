import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  ButtonAsLink,
} from './button.composition'

it('should render a button as a Link, checks for href attribute and primary class', () => {
  render(<ButtonAsLink />)
  const buttonAsLink = screen.getByRole('link', { name: /link/i })
  expect(buttonAsLink).toHaveClass('primary')
  expect(buttonAsLink).toHaveAttribute('href', '/')
})

// checks to see if button works as a link 