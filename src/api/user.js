/**
 * Copyright [2022] [remember5]
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { http } from '@/service/request.js'

/**
 * 注册
 * @param data
 * @returns {HttpPromise<any>} /
 */
export const register = (data) => http.post('/user/register', data)
/**
 * 登出
 * @returns {HttpPromise<any>}
 */
export const logout = () => http.post('/user/logout')
/**
 * 账号登录
 * @param data /
 * @returns {HttpPromise<any>} /
 */
export const loginByAccount = (data) => http.post('/user/loginByAccount', data)
/**
 * 账号登录
 * @returns {HttpPromise<any>} /
 */
export const getUserInfo = () => http.get('/user/info')
/**
 * 手机验证码登录
 * @param data
 * @returns {HttpPromise<any>} /
 */
export const loginByPhoneCaptcha = (data) => http.post('/user/loginByPhoneCaptcha', data)
/**
 * 微信小程序code换取session
 * @param params
 * @returns {HttpPromise<any>} /
 */
export const wxMiniAppCode2Sessions = (params) => http.post(`/user/wxMiniAppCode2Sessions`, params)
/**
 * 微信小程序登录
 * @param params
 * @returns {HttpPromise<any>} /
 */
export const wxMiniAppLogin = (params) => http.post(`/user/wxMiniAppLogin`, params)
/**
 * 支付宝一键登录
 * @param data /
 * @returns {HttpPromise<any>} /
 */
export const loginByZfb = (data) => http.post('/user/loginByZfb', data)
/**
 * Token续期
 * @param data
 * @returns {HttpPromise<any>} /
 */
export const refToken = (data) => http.post('/user/refToken', data)
/**
 * 获取图形验证码
 * @returns {HttpPromise<any>} /
 */
export const code = () => http.get('/user/code')
/**
 * 发送短信验证码
 * @returns {HttpPromise<any>} /
 */
export const smsCode = (data) => http.post('/user/smsCode', data)
/**
 * 注销
 * @param data
 * @returns {HttpPromise<any>}
 */
export const deleted = (data) => http.get('/user/deleted', { params: data })
/**
 * 短信验证码
 * @param data
 * @returns {HttpPromise<any>}
 */
export const captchaByRegister = (data) => http.get(`/user/captchaByRegister`, { params: data })
/**
 * 忘记密码获取短信验证码
 * @param data
 * @returns {HttpPromise<any>}
 */
export const captchaByResetPassword = (data) => http.get(`/user/captchaByResetPassword`, { params: data })
/**
 * 忘记密码
 * @param data
 * @returns {HttpPromise<any>}
 */
export const resetPassword = (data) => http.post(`/user/resetPassword`, data)

export const testMockRequest = () => http.get('/api/test')
