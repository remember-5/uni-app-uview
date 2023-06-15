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
const lifeData = uni.getStorageSync('lifeData')

export const state = {
  // 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
  // 加上vuex_前缀，是防止变量名冲突，也让人一目了然
  vuex_wang: lifeData.vuex_wang ? lifeData.vuex_wang : ''
}

export const mutations = {}

export const actions = {}
