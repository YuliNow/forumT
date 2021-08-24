/*
 * @author: DoubleW
 * @create: 2021-06-21 10:43 AM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-06-21 19:51 PM
 * @desc:
 */
import req from "./request";

/**
 * 用户登录接口
 * 必选：用户名name，密码pw;
 * @param {*} params = { name, pw }
 *
 */
export async function login(params) {
  return await req({ url: "/api/login", method: "post", params });
}

/**
 * 用户注册接口
 * 必选：用户名name，密码pw;
 * 可选：昵称nick_name
 * @param {*} params = { name, pw, nick_name }
 */
export async function register(params) {
  return await req({ url: "/api/register", method: "post", params });
}

/**
 * 用户更新个人信息接口
 * 必选：token,性别sex-1男2女3保密
 * 可选：昵称nick_name，兴趣爱好insert，qq，头像icon，手机phone，水印地址watermark
 * @param {*} params  = { token, nick_name, sex, insert, qq, icon, phone, watermark}
 */
export async function userModify(params) {
  return await req({ url: "/api/userModify", method: "post", params });
}

/**
 * 用户修改密码接口
 * 必选：token，新密码pw，旧密码old
 * @param {*} params = { token, pw, old }
 */
export async function rePwd(params) {
  return await req({ url: "api/rePassword", method: "post", params });
}

/**
 * 用户所有基本信息(包含发帖数)
 * 必选：token
 * @param {*} params = { token }
 */
export async function userAllInfo(params) {
  return await req({ url: "api/userAllInfo", method: "post", params });
}

/**
 * 关注用户
 * 必选：token， 被关注用户的id be_concern_user_id
 * @param {*}} params = { token, be_concern_user_id }
 */
export async function concern(params) {
  return await req({ url: "api/concern", method: "post", params });
}

/**
 * 取消关注
 * 必选：token， 被取消关注用户的id be_concern_user_id
 * @param {*}} params = { token, be_concern_user_id }
 */
export async function concernDel(params) {
  return await req({ url: "api/concernDel", method: "post", params });
}

/**
 * 用户粉丝列表 与 我关注的用户列表
 * @param {*} params = { uid }
 */
export async function concernList(params) {
  return await req({ url: "api/concernList", method: "post", params });
}

/**
 * 收藏或取消收藏帖子沸点
 * 必选：token， 文章id article_id
 * @param {*} params = { token, article_id }
 */
export async function collectionAddDel(params) {
  return await req({ url: "api/collectionAddDel", method: "post", params });
}

/**
 * 用户收藏列表
 * 必选：token， 文章类型type-1文章2沸点
 * @param {*} params = { token, type }
 */
export async function collectionList(params) {
  return await req({ url: "api/collectionList", method: "post", params });
}

/**
 * 路人用户的基本信息
 * 必选：用户id user_id
 * @param {*} params = { user_id }
 */
export async function personInfo(params) {
  return await req({ url: "api/personInfo", method: "post", params });
}
