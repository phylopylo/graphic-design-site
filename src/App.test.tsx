import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: () => <div />,
  Link: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useLocation: () => ({ pathname: '/' }),
}));

// Mock Layout component to simplify testing
vi.mock('./components/Layout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>
      <h1>Ethereal Designs</h1>
      <p>Where dreams take form</p>
      <div>{children}</div>
    </div>
  ),
}));

describe('App Component', () => {
  it('should render the header', () => {
    render(<App />)
    expect(screen.getByText('Ethereal Designs')).toBeDefined()
    expect(screen.getByText('Where dreams take form')).toBeDefined()
  })
}) 