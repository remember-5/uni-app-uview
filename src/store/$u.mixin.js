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
import { mapState } from 'vuex'
import store from '@/store'

// 尝试将用户在根目录中的store/index.js的vuex的state变量，全部加载到全局变量中
let $uStoreKey = []
try {
  $uStoreKey = store.state ? Object.keys(store.state) : []
} catch (e) {
  console.error(e)
}

export default {
  beforeCreate() {
    // 将vuex方法挂在到$u中
    // 使用方法为：如果要修改vuex的state中的user.name变量为"史诗" => this.$u.vuex('user.name', '史诗')
    // 如果要修改vuex的state的version变量为1.0.1 => this.$u.vuex('version', '1.0.1')
    this.$u.vuex = (name, value) => {
      this.$store.commit('$uStore', {
        name,
        value
      })
    }
  },
  computed: {
    // 将vuex的state中的所有变量，解构到全局混入的mixin中
    ...mapState($uStoreKey)
  }
}
