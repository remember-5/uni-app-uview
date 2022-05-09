// 注册
export const register = async (vm, data) => {
	return await vm.$u.post('/user/register', data);
}
// 登出
export const logout = async (vm) => {
	return await vm.$u.post('/user/logout');
}
// 账号登录
export const loginByAccount = async (vm, data) => {
	return await vm.$u.post('/user/loginByAccount', data);
}
// 手机验证码登录
export const loginByPhoneCaptcha = async (vm, data) => {
	return await vm.$u.post('/user/loginByPhoneCaptcha', data);
}
// 微信一键登录
export const loginByWx = async (vm, data) => {
	return await vm.$u.post('/user/loginByWx', data);
}
// 支付宝一键登录
export const loginByZfb = async (vm, data) => {
	return await vm.$u.post('/user/loginByZfb', data);
}
// Token续期
export const refToken = async (vm, data) => {
	return await vm.$u.post('/user/refToken', data);
}
// 获取图形验证码
export const code = async (vm, data) => {
	return await vm.$u.get('/user/code', data);
}
// 注销
export const deleted = async (vm, data) => {
	return await vm.$u.get('/user/deleted', data);
}
// 短信验证码
export const captchaByRegister = async (vm, data) => {
	return await vm.$u.get(`/user/captchaByRegister/${data}`);
}
// 忘记密码获取短信验证码
export const captchaByResetPassword = async (vm, data) => {
	return await vm.$u.get(`/user/captchaByResetPassword/${data}`);
}



