export function saveToken(token) { localStorage.setItem('token', token) }
export function getToken(){ return localStorage.getItem('token') }
export function logout(){ localStorage.removeItem('token'); localStorage.removeItem('username') }
export function isLoggedIn(){ return !!getToken() }
export function saveUsername(u){ localStorage.setItem('username', u) }
export function getUsername(){ return localStorage.getItem('username') }