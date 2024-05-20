import styled from 'styled-components';
import { University } from '../constants';

const Card = styled.div`
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    padding: 1rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-radius: 4px;

    & + & {
        margin-top: 1rem;
    }

    .card__title {
        font-weight: 600;
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
    }
    .card__location {
        font-weight: 300;
        margin-bottom: 1rem;
    }
    .card__domain {
        color: #7c54d7;
    }
`;

const DeleteButton = styled.button`
    background-color: red;
    border: 0;
    padding: 0.5rem 1rem;
    color: #ffffff;
    cursor: pointer;
    border-radius: 2px;
`;

const UniversityCard = ({
    university,
    onDelete,
}: {
    university: University;
    onDelete: (university: University) => void;
}) => {
    return (
        <Card>
            <div>
                <div className="card__title">{university.name}</div>
                <div className="card__location">{university.country}</div>
                {university.domains.map((domain) => (
                    <a className="card__domain" key={domain} href={domain}>
                        {domain}
                    </a>
                ))}
            </div>
            <DeleteButton onClick={() => onDelete(university)}>Delete</DeleteButton>
        </Card>
    );
};

export default UniversityCard;
