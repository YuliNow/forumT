/*
 * @author: DoubleW
 * @create: 2021-06-21 14:01 PM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-06-22 16:34 PM
 * @desc:
 */
import req from "./request";

/**
 * 新增/修改帖子
 * 必选：token，详情info，标签tags_name(arr),
 * 可选：标题title，帖子id article_id(修改帖子时必传)，
 *      帖子类型type-1文章(默认)2沸点，分类article_type,
 *      图片(arr,json过后的内容)pic，描述describe
 * @param {*} params = { token,title,info,tags_name,article_id,type,article_type,pic,describe }
 */
export async function addModifyArticle(params) {
  return await req({ url: "api/addModifyArticle", method: "post", params });
}

/**
 * 标签排行
 * ? 话题排行
 * 可选：tag排行前几 ranking_num
 * @param {*} params = { ranking_num }
 */
export async function tagRanking(params = {}) {
  return await req({ url: "api/tagRanking", method: "post", params });
}

/**
 * 帖子或沸点列表
 * ! 以下皆为可选值
 * page:页数 int
 * size:每页数量 int
 * tag_id:标签id(搜索时传)
 * search:帖子标题(搜索时传) str
 * user_id:用户id str
 * concern:为true时即我关注的用户发的帖子(需要传token)
 * type:1-帖子(默认)2-沸点
 * sort:发布时间排序0-倒叙(默认)1-按点击
 * @param {*} params = { page, size, tag_id, search, user_id, concern, type, sort }
 */
export function articleList(params = {}) {
  return req({ url: "api/articleList", method: "post", params });
}

/**
 * 回复 接口
 * !必选
 * token
 * comment_info:评论内容 longtext
 * article_id:评论的帖子id int
 * !可选
 * father_id:回复帖子的评论时必传 回复帖子的顶层评论的comment_id
 * remind_info:回复帖子的评论时要回复的人-建议格式[{user_id:1,nick_name:张三}]
 * aite:回复帖子的评论时要艾特的人-建议格式[{user_id:1,nick_name:张三}]
 * @param {*} params = { token, comment_info, article_id, father_id, remind_info, aite }
 */
export function addComment(params) {
  return req({ url: "api/addComment", method: "post", params });
}

/**
 * 帖子评论列表
 * !必选
 * article_id:帖子id int
 * !可选
 * page:页数 int
 * size:每页条数 int
 * father_id:二级评论的id
 * @param {*} params = { article_id, page, size, father_id }
 */
export function articleInfo(params) {
  return req({ url: "api/articleInfo", method: "post", params });
}
