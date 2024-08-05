import Api from '../axiosConfig';
import adminEndpoint from '../../endpoints/adminEndpoints/AdminEndpoint';
import { AxiosResponse } from 'axios';
import * as axios from 'axios';

export  const addTeacher =  async(formData:FormData): Promise<AxiosResponse<unknown> | undefined> =>{
    try{
     const response = await Api.post(adminEndpoint.addTeacher, formData, {
       headers: {
         'Content-Type': 'multipart/form-data'
       }
     });
      return response;
    }catch(error){
     if(axios.isAxiosError(error)){
       return error.response;
     }else{
       console.error('unexpected error:', error);
       throw error;
     }
    }
  }