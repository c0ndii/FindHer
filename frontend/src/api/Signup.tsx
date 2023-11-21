import { signupModel } from "./schema";
import  axios  from 'axios';


const baseUrl = 'https://localhost:7055/api/account/register'

export const registerUser = async (userData : signupModel) => {
    try{
        const response = await axios.post(baseUrl,
            JSON.stringify(userData),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }
            );
            if (response.request?.status === 200) {
                return response;
            } else {
                const errorData = await response;
                throw new Error(`Registration failed: ${JSON.stringify(errorData.headers)}`);
            }
    }catch (error:any){
        throw new Error('Error during registration');
    };
  };
