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
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)

const modules = {
  state: {},
  mutations: {},
  actions: {}
}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
const saveStateKeys = ['vuex_user_info', 'vuex_access_token', 'vuex_refresh_token', 'vuex_wang', 'vuex_platform', 'vuex_version_code', 'vuex_version']

// 保存变量到本地存储中
const saveLifeData = function (key, value) {
  // 判断变量名是否在需要存储的数组中
  if (saveStateKeys.indexOf(key) !== -1) {
    // 获取本地存储的lifeData对象，将变量添加到对象中
    let tmp = uni.getStorageSync('lifeData')
    // 第一次打开APP，不存在lifeData变量，故放一个{}空对象
    tmp = tmp || {}
    tmp[key] = value
    // 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
    uni.setStorageSync('lifeData', tmp)
  }
}

const mutations = {
  $uStore(state, payload) {
    // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
    const nameArr = payload.name.split('.')
    let saveKey = ''
    const len = nameArr.length
    if (len >= 2) {
      let obj = state[nameArr[0]]
      for (let i = 1; i < len - 1; i++) {
        obj = obj[nameArr[i]]
      }
      obj[nameArr[len - 1]] = payload.value
      saveKey = nameArr[0]
    } else {
      // 单层级变量，在state就是一个普通变量的情况
      state[payload.name] = payload.value
      saveKey = payload.name
    }
    // 保存变量到本地，见顶部函数定义
    saveLifeData(saveKey, state[saveKey])
  }
}

files.keys().forEach((key) => {
  Object.assign(modules.state, files(key).state)
  // 因为做了代理 这一步要做处理
  Object.assign(modules.mutations, mutations)
  Object.assign(modules.actions, files(key).actions)
})

const store = new Vuex.Store(modules)
export default store
