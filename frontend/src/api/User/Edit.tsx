import Cookies from 'js-cookie';
import { userModel } from './schema';
import axios from 'axios';

const baseUrl = 'https://localhost:7055/api/account/editprofile';

export const editUser = async (userData : userModel) => {
    try{
        const response = await axios.put(baseUrl,
            JSON.stringify(userData),
            {
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')?.toString(),
                },
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


