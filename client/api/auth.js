import httpGet from '../http-get'

export const loginSuccess = async () => {
    const response = await httpGet.get(`/auth/verifytoken/${localStorage.getItem('token')}`, {"Cache-Control": "no-store"});
    return response.data;
}