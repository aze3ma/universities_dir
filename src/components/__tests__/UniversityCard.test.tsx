import { fireEvent, screen, render } from '@testing-library/react';
import UniversityCard from '../UniversityCard';
import UniversitiesList from '../UniversitiesList';
import { University } from '../../constants';

const mockDeleteUniversity = jest.fn();

const mockUniversity: University = {
    name: 'Test University',
    country: 'Test Country',
    domains: ['test1.com', 'test2.com'],
    web_pages: ['test1.com', 'test2.com'],
    alpha_two_code: 'TE',
    'state-province': '',
};

describe('UniversityCard Component', () => {
    it('renders university card correctly', () => {
        render(<UniversityCard university={mockUniversity} onDelete={mockDeleteUniversity} />);

        expect(screen.getByText('Test University')).toBeInTheDocument();
        expect(screen.getByText('Test Country')).toBeInTheDocument();
        expect(screen.getByText('test1.com')).toBeInTheDocument();
        expect(screen.getByText('test2.com')).toBeInTheDocument();
    });

    it('calls onDelete function when delete button is clicked', () => {
        render(<UniversityCard university={mockUniversity} onDelete={mockDeleteUniversity} />);

        fireEvent.click(screen.getByText('Delete'));
        expect(mockDeleteUniversity).toHaveBeenCalledWith(mockUniversity);
    });
});

describe('UniversitiesList Component', () => {
    it('renders list of universities correctly', () => {
        render(<UniversitiesList />);
        expect(screen.getByText('Sort Universities')).toBeInTheDocument();
    });
});
