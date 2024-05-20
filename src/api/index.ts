import { University, baseURL } from '../constants';

export const getUniversities = async (): Promise<University[]> => {
    const response = await fetch(`${baseURL}?country=United Arab Emirates`);

    return await response.json();
};
