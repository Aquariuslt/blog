import axios from 'axios';

export const loadApi = async (apiPath: string) => {
  const result = await axios.get(`/api` + apiPath + `.json`);
  return result.data;
};

export interface ApiPathProps {
  apiPath: string;
}
