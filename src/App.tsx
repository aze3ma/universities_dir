import styled from 'styled-components';
import UniversitiesList from './components/UniversitiesList';

const Container = styled.div`
    max-width: 1080px;
    margin: 0 auto;
`;

const App = () => {
    return (
        <Container>
            <UniversitiesList />
        </Container>
    );
};

export default App;
