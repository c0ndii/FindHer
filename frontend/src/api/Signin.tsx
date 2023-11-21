import { loginModel } from './schema';
import axios from 'axios';

const baseUrl = 'https://localhost:7055/api/account/login';

export const loginUser = async (userData : loginModel) => {
    try{
        const response = await axios.post(baseUrl,
            JSON.stringify(userData),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true,
                responseType: 'text',
            }
            );
            if (response.request?.status === 200) {
                localStorage.setItem('Authorization','Bearer '+response.data);
                return response;
            } else {
                const errorData = await response;
                throw new Error(`Login failed: ${JSON.stringify(errorData.headers)}`);
            }
    }catch (error:any){
        throw new Error('Invalid credentials');
    };
  };


