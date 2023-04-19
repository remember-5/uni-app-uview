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
import { wxMiniAppLogin } from '@/api/user'

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

export const wxLogin = async (params) => {
  try {
    console.log(params)
    const result = await wxMiniAppLogin(params)
    // save token
    console.log(result)
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}
