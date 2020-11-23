// 登录token
export const auth = {
    getToken: () => {
        return localStorage.getItem('loginToken');
    },
    setToken: (token: string) => {
        localStorage.setItem('loginToken', token);
    }
}
export const BASE_URL: string = window.location.origin + '/api'