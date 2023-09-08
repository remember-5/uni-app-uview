/**
 * Copyright [2022] [remember5]
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use Vue file except in compliance with the License.
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
import { wxMiniAppLogin, code, smsCode, loginByAccount, loginByPhoneCaptcha, register, resetPassword, captchaByResetPassword } from '@/api/auth'
import Vue from '@/main.js'
/**
 * 获取微信登录的code
 * @returns {Promise<unknown>}
 */
export const getWxLoginCode = () => {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: (res) => {
        if (res?.code) {
          resolve(res.code)
        } else {
          reject(res.errMsg)
        }
      },
      fail: (e) => {
        reject(e)
      }
    })
  })
}

/**
 * 登录
 * @param params 登录入参
 * @param type 0 微信一键登录 1 密码登录 2 手机验证码登录
 * @returns {Promise<boolean>}
 */
export const login = async (params, type) => {
  try {
    let result
    switch (type) {
      case 0:
        result = await wxMiniAppLogin(params)
        break
      case 1:
        result = await loginByAccount(params)
        break
      case 2:
        result = await loginByPhoneCaptcha(params)
        break
      default:
        return false
    }
    if (result.code === '00000') {
      const data = result?.data
      // save token
      saveToken(data)
    } else {
      Vue.$u.toast(result.message)
      return false
    }
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

/**
 * 手机号密码注册用户
 * @param params
 * @returns {Promise<boolean>}
 */
export const registerUser = async (params) => {
  try {
    const result = await register(params)
    if (result.code === '00000') {
      Vue.$u.toast('注册成功！')
      Vue.$u.vuex('vuex_access_token', result?.data)
    } else {
      Vue.$u.toast(result.message)
      return false
    }
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

/**
 * 获取图形验证码
 * @returns {Promise<void>}
 */
export const getImgCaptcha = async () => {
  const result = await code()
  return result
}

/**
 * 发送短信验证码
 * @returns {Promise<boolean>}
 */
export const sendSmsCode = async (params) => {
  try {
    const result = await smsCode(params)
    if (result.code === '00000') {
      Vue.$u.toast('短信发送成功，请注意查看')
      return true
    } else {
      Vue.$u.toast(result.message)
      return false
    }
  } catch (err) {
    console.error(err)
    return false
  }
}

/**
 * 保存token
 */
export const saveToken = (data) => {
  Vue.$u.vuex('vuex_access_token', data.access_token)
  Vue.$u.vuex('vuex_refresh_token', data.refresh_token)
  Vue.$u.vuex('vuex_user_info', data.user_info)
  Vue.$u.toast('登录成功！')
}

/**
 * 用户忘记密码
 * @returns {Promise<boolean>}
 */
export const resetUserPassword = async (params) => {
  try {
    const result = await resetPassword(params)
    if (result.code === '00000') {
      Vue.$u.toast('修改密码成功，请登录')
      return true
    } else {
      Vue.$u.toast(result.message)
      return false
    }
  } catch (err) {
    console.error(err)
    return false
  }
}

/**
 * 忘记密码获取短信验证码
 * @returns {Promise<boolean>}
 */
export const captchaByResetUserPassword = async (params) => {
  try {
    const result = await captchaByResetPassword(params)
    if (result.code === '00000') {
      Vue.$u.toast('短信发送成功，请注意查看')
      return true
    } else {
      Vue.$u.toast(result.message)
      return false
    }
  } catch (err) {
    console.error(err)
    return false
  }
}
