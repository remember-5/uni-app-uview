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
export const state = {
  // webView地址
  vuex_webview_url: '',
  vuex_loading_how: false,
  // 微信场景参数
  vuex_chat_scenes_info: {},
  // 绑定微信头像昵称弹窗状态
  vuex_bind_userinfo_show: false,
  // 当前位置
  vuex_current_address: {
    areaName: '请选择',
    areaId: ''
  }
}
export const mutations = {}
export const actions = {}
