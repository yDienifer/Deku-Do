import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import Navbar from '../../components/layouts/navbar/navbar';

describe('checking if the navbar shortcuts are functioning correctly.', () => {
  it('should display the navbar shortcuts.', () => {
    const { getAllByText } = render(<Navbar />);
    expect(getAllByText('Início')).toBeTruthy();
    expect(getAllByText('Sobre nós')).toBeTruthy();
    expect(getAllByText('Contate-me')).toBeTruthy();
    expect(getAllByText('Suporte')).toBeTruthy();
  });

  it('should display the dropdown shortcuts', () => {
    const { getAllByText } = render(<Navbar />);
    expect(getAllByText('Github')).toBeTruthy();
    expect(getAllByText('LinkedIn')).toBeTruthy();
    expect(getAllByText('Instagram')).toBeTruthy();
  });

  it('should have correct redirection of dropdown shortcuts.', () => {
    const { getAllByTestId } = render(<Navbar />);

    const shortcutGithub = getAllByTestId('shortcutGithub')[0];
    const shortcutLinkedIn = getAllByTestId('shortcutLinkedIn')[0];
    const shortcutInstagram = getAllByTestId('shortcutInstagram')[0];

    const linkBeforeClick = 'http://localhost:3000/';

    fireEvent.click(shortcutGithub);
    fireEvent.click(shortcutLinkedIn);
    fireEvent.click(shortcutInstagram);

    const linkAfterClickGithub = shortcutGithub.getAttribute('href');
    const linkAfterClickLinkedIn = shortcutLinkedIn.getAttribute('href');
    const linkAfterClickInstagram = shortcutInstagram.getAttribute('href');

    expect(linkBeforeClick).not.toBe(linkAfterClickGithub);
    expect(linkBeforeClick).not.toBe(linkAfterClickLinkedIn);
    expect(linkBeforeClick).not.toBe(linkAfterClickInstagram);

    expect(linkAfterClickGithub).toBe('https://github.com/yDienifer');
    expect(linkAfterClickLinkedIn).toBe(
      'https://www.linkedin.com/in/di%C3%AAnifer-siqueira-08b4aa247?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    );
    expect(linkAfterClickInstagram).toBe(
      'https://instagram.com/dienifer.dev?igshid=NzZlODBkYWE4Ng=='
    );
  });
});
