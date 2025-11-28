import api from './api';

export const login = (data: any) => api.post('/passport/auth/login', data);
export const register = (data: any) => api.post('/passport/auth/register', data);
export const forgetPassword = (data: any) => api.post('/passport/auth/forget', data);
export const sendVerifyCode = (email: string) => api.post('/passport/comm/sendEmailVerify', { email });
export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/#/login';
};
