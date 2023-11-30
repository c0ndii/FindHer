import { matchModel } from './schema';
import axios from 'axios';

const baseUrl = 'https://localhost:7055/api/matchform/';

export const editUser = async (userData : matchModel) => {
    try{
        const response = await axios.put(baseUrl,
            JSON.stringify(userData),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true,
                responseType: 'text',
            }
            );
            if (response.request?.status === 200) {
                console.log(userData);
                return response;
            } else {
                const errorData = await response;
                throw new Error(`Edit profile failed: ${JSON.stringify(errorData.headers)}`);
            }
    }catch (error:any){
        throw new Error('Failed operation');
    };
  };

