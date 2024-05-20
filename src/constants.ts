export const baseURL = 'http://universities.hipolabs.com/search';

export type University = {
    country: string;
    web_pages: string[];
    alpha_two_code: string;
    domains: string[];
    'state-province': string;
    name: string;
};
