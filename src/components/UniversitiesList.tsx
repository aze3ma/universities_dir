import { useMemo } from 'react';
import styled from 'styled-components';
import { getUniversities } from '../api';
import { University } from '../constants';
import { useController } from '../hooks/useController';
import { useOnMount } from '../hooks/useOnMount';
import UniversityCard from './UniversityCard';
import { cacheToLocalStorage, getCachedData } from '../utils/cache';

const ListContainer = styled.div`
    padding: 1rem;
`;

const SortButton = styled.button`
    background-color: #7c54d7;
    border: 0;
    padding: 0.5rem 1rem;
    color: #ffffff;
    cursor: pointer;
    border-radius: 2px;
    margin-bottom: 1rem;
`;

type Model = {
    universities: University[];
};

const controller = ({ model, getUniversities }: { model: Model; getUniversities: () => Promise<University[]> }) => {
    async function onMount() {
        let universities = getCachedData({ label: 'universities' });

        if (!universities) {
            universities = await getUniversities();
            cacheToLocalStorage({ label: 'universities', value: universities });
        }

        model.universities = universities;
    }

    function onUnmount() {
        model.universities = [];
    }

    function deleteUniversity(university) {
        const index = model.universities.indexOf(university);

        model.universities.splice(index, 1);
    }

    function sortUniversities() {
        model.universities = model.universities.sort((a, b) => a.name.localeCompare(b.name));
    }

    return {
        onMount,
        onUnmount,
        deleteUniversity,
        sortUniversities,
    };
};

const UniversitiesList = () => {
    const model = useMemo(() => ({ universities: [] as University[] }), []);
    const { onMount, onUnmount, deleteUniversity, sortUniversities } = useController({
        model,
        controller,
        getUniversities,
    });

    useOnMount(onMount, onUnmount);

    return (
        <ListContainer>
            <SortButton onClick={sortUniversities}>Sort Universities</SortButton>
            {model.universities && model.universities.length > 0 ? (
                model.universities.map((university) => (
                    <UniversityCard university={university} key={university.name} onDelete={deleteUniversity} />
                ))
            ) : (
                <div>No universities found.</div>
            )}
        </ListContainer>
    );
};

export default UniversitiesList;
