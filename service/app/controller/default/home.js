'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    let result = await this.app.mysql.get('article', {});
    console.log(result);
    this.ctx.body = result;
  }
  async getArticleList() {
    const sql = 'SELECT article.id  as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime," +
              'article.view_count as view_count,' +
              '.type.typeName as typeName ' +
              'FROM article LEFT JOIN type on article.type_id = type.id';
    const results = await this.app.mysql.query(sql)

    this.ctx.body = {data: results}
  }

  async getArticleById() {
    let id = this.ctx.params.id; 
    let sql = 'SELECT article.id as id,' +
        'article.title as title,' +
        'article.introduce as introduce,' +
        'article.article_content as article_content,' +
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
        'article.view_count as view_count ,' +
        'type.typeName as typeName ,' +
        'type.id as typeId ' +
        'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
        'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);

    this.ctx.body = { data: result };
  }
  // Get Type and id
  async getTypeInfo() {

    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };

  }
  // 根据类别id获得文章列表
  async getListById() {
    let id = this.ctx.params.id;
    let sql = 'SELECT article.id as id,' +
    'article.title as title,' +
    'article.introduce as introduce,' +
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
    'article.view_count as view_count ,' +
    'type.typeName as typeName ' +
    'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    'WHERE type_id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };

}


}

module.exports = HomeController;
