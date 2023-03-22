import { render, screen } from '@testing-library/react';
import Logo from './logo';

describe('Logo', () => {
  test('Logo must have src = "/logo.svg" and alt = "Logo"', () => {
    render(<Logo/>);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', '/logo.svg');
    expect(logo).toHaveAttribute('alt', 'Logo');
  });
});
