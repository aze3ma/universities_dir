import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UniversitiesList from '../UniversitiesList';

jest.mock('../../api', () => ({
    getUniversities: jest.fn(() =>
        Promise.resolve([
            { name: 'Test University 1', country: 'Test Country 1', domains: ['test1.com'] },
            { name: 'Test University 2', country: 'Test Country 2', domains: ['test2.com'] },
        ])
    ),
}));

describe('UniversitiesList Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('renders list of universities correctly', async () => {
        render(<UniversitiesList />);

        expect(screen.getByText('Sort Universities')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Test University 1')).toBeInTheDocument();
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(screen.getByText('Test University 2')).toBeInTheDocument();
        });
    });

    it('sorts universities alphabetically', async () => {
        render(<UniversitiesList />);
        expect(screen.getByText('Sort Universities')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getAllByText(/Test University/i)).toHaveLength(2);
        });

        fireEvent.click(screen.getByText('Sort Universities'));

        expect(screen.getAllByText(/Test University/i)[0]).toHaveTextContent('Test University 1');
        expect(screen.getAllByText(/Test University/i)[1]).toHaveTextContent('Test University 2');
    });
});
