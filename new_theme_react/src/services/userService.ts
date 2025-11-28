import api from './api';

export const getUserInfo = () => api.get('/user/info');
export const getSubscribe = () => api.get('/user/getSubscribe');
export const getStat = () => api.get('/user/getStat');
export const getTrafficLog = () => api.get('/user/stat/getTrafficLog');

export const fetchOrders = () => api.get('/user/order/fetch');
export const fetchOrder = (trade_no: string) => api.get(`/user/order/detail?trade_no=${trade_no}`);
export const saveOrder = (data: any) => api.post('/user/order/save', data);
export const checkoutOrder = (trade_no: string, method: string) => api.post('/user/order/checkout', { trade_no, method });

export const fetchPlans = () => api.get('/user/plan/fetch');

export const fetchServers = () => api.get('/user/server/fetch');

export const fetchTickets = () => api.get('/user/ticket/fetch');
export const saveTicket = (data: any) => api.post('/user/ticket/save', data);
export const replyTicket = (data: any) => api.post('/user/ticket/reply', data);
export const closeTicket = (id: number) => api.post('/user/ticket/close', { id });

export const fetchKnowledge = () => api.get('/user/knowledge/fetch');

export const redeemGiftCard = (code: string) => api.post('/user/gift-card/redeem', { code });
