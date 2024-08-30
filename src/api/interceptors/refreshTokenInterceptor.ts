import  { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";


interface FailedRequest {
    resolve: (token: string | null) => void;
    reject: (error: unknown) => void;
  }
  
  let isRefreshing = false;
  let failedQueue: FailedRequest[] = [];
  
  const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  };
  
  export const refreshTokenAxiosInterceptors = (Api:AxiosInstance) => {
  Api.interceptors.response.use(
    (response:AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
  
      if (!originalRequest) {
        return Promise.reject(error);
      }
  
      const errorMessage = (error.response?.data as { message?: string })?.message;
  
      if (errorMessage === 'Admin Token Not Found' ||
        errorMessage === 'Student Token Not Found' ||
        errorMessage === 'Teacher Token Not Found') {
  
        // Clear specific localStorage items based on the error message
        if (errorMessage === 'Admin Token Not Found') {
          localStorage.removeItem('adminInfo');
        } else if (errorMessage === 'Student Token Not Found') {
          localStorage.removeItem('studentInfo');
        } else if (errorMessage === 'Teacher Token Not Found') {
          localStorage.removeItem('teacherInfo');
        }
  
        // Redirect to the appropriate login page based on the error
        if (errorMessage === 'Admin Token Not Found') {
          window.location.href = '/admin/';
        } else if (errorMessage === 'Student Token Not Found') {
          window.location.href = '/StudentLogin';
        } else if (errorMessage === 'Teacher Token Not Found') {
          window.location.href = '/teacherLogin';
        }
  
        return Promise.reject(error);
      }
  
  
      if (error.response?.status === 401 && !originalRequest._retry) {
        const errorMessage = (error.response.data as { message?: string })?.message;
  console.log('errrrrrrrrrr',errorMessage);
  
        let refreshPath: string | undefined;
        let userInfoKey: string | undefined;
  
        if (errorMessage === 'Admin Token expired') {
          refreshPath = '/admin/refresh';
          userInfoKey = 'adminInfo';
        } else if (errorMessage === 'Student Token expired') {
          refreshPath = '/student/refresh';
          userInfoKey = 'studentInfo';
        } else if (errorMessage === 'Teacher Token expired') {
          refreshPath = '/teacher/refresh';
          userInfoKey = 'teacherInfo';
        } // Handle invalid refresh token scenario
        else if (errorMessage === 'Invalid Admin Refresh Token') {
          localStorage.removeItem('adminInfo');
          window.location.href = '/admin/';
          return Promise.reject(error);
        } else if (errorMessage === 'Invalid Student Refresh Token') {
          localStorage.removeItem('studentInfo');
          window.location.href = '/StudentLogin';
          return Promise.reject(error);
        } else if (errorMessage === 'Invalid Teacher Refresh Token') {
          localStorage.removeItem('teacherInfo');
          window.location.href = '/teacherLogin';
          return Promise.reject(error);
        } else {
          return Promise.reject(error);
        }
  
        if (isRefreshing) {
          return new Promise<string | null>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(() => {
            return Api(originalRequest);
          }).catch(err => Promise.reject(err));
        }
  
        originalRequest._retry = true;
        isRefreshing = true;
  
        try {
          const refreshResponse = await Api.post(refreshPath);
          console.log('refreshResponse', refreshResponse);
  
          processQueue(null);
  
          return Api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          // Clear user info
          if (userInfoKey) {
            localStorage.removeItem(userInfoKey);
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
  
      return Promise.reject(error);
    }
  );
}
  