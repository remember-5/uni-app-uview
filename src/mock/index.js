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
const files = require.context('./apis', false, /\.js$/)

files.keys().forEach((key) => {
  const module = files(key)
  for (const exportKey in module) {
    // eslint-disable-next-line no-prototype-builtins
    if (module.hasOwnProperty(exportKey)) {
      const exported = module[exportKey]
      // 将导出内容添加到index.js中
      Object.assign(exports, exported)
    }
  }
})
