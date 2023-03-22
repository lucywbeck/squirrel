import {describe, expect, test} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import Root from './Root';

describe('Home page tests', () => {
    
  test("Start My Adventure button should load onto the home page", () => {
    render(<Root />);
    expect(screen.getByText("Start My Adventure")).toBeDefined();  
  });

});

describe('mock user', () => {
  beforeEach(() => {
    useAuthState.mockReturnValue([user]);
    useProfile.mockReturnValueOnce([profile]);
    render(<App />);
  });

  it('load home page', async () => {
    const homeButton = screen.getByText('Home');
    fireEvent.click(homeButton);
    expect(await screen.getByText('page does not exist')).toBeDefined();
  });
});

describe('without logged in user', () => {
  beforeEach(() => {
    useAuthState.mockReturnValue([null]);
    useProfile.mockReturnValue([null]);
    render(<App />);
  });
});
