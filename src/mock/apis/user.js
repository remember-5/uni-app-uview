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
import Mock from 'better-mock/dist/mock.mp.js'

Mock.mock('/user/code', {
  code: '00000',
  data: {
    uuid: 'code-key-448c6dc143764b89bce1c7fb002fe5c7',
    img: 'data:image/png;base64,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'
  },
  message: '一切ok '
})
