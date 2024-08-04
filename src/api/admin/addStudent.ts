import Api from '../axiosConfig';
import adminRoutes from '../../endpoints/adminRoutes';
import { AxiosResponse } from 'axios';
import * as axios from 'axios';

export  const addStudent =  async(formData:FormData): Promise<AxiosResponse<unknown> | undefined> =>{
    try{
     const response = await Api.post(adminRoutes.addStudent, formData, {
       headers: {
         'Content-Type': 'multipart/form-data'
       }
     });
      return response
    }catch(error){
     if(axios.isAxiosError(error)){
       return error.response;
     }else{
       console.error('unexpected error:', error);
       throw error;
     }
    }
  }