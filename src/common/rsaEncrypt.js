// 引用
import JSEncrypt from 'jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair
// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(process.env.VUE_APP_RSA_PUBLIC_KEY) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}
