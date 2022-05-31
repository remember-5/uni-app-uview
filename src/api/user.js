// 注册
export const register = (vm, data) => vm.$u.post('/user/register', data);
// 登出
export const logout = (vm) => vm.$u.post('/user/logout');
// 账号登录
export const loginByAccount = (vm, data) => vm.$u.post('/user/loginByAccount', data);
// 手机验证码登录
export const loginByPhoneCaptcha = (vm, data) => vm.$u.post('/user/loginByPhoneCaptcha', data);
// 微信一键登录
export const loginByWx = (vm, data) => vm.$u.post('/user/loginByWx', data);
// 支付宝一键登录
export const loginByZfb = (vm, data) => vm.$u.post('/user/loginByZfb', data);
// Token续期
export const refToken = (vm, data) => vm.$u.post('/user/refToken', data);
// 获取图形验证码
export const code = (vm, data) => vm.$u.get('/user/code', data);
// 注销
export const deleted = (vm, data) => vm.$u.get('/user/deleted', data);
// 短信验证码
export const captchaByRegister = (vm, data) => vm.$u.get(`/user/captchaByRegister/${data}`);
// 忘记密码获取短信验证码
export const captchaByResetPassword = (vm, data) => vm.$u.get(`/user/captchaByResetPassword/${data}`);
