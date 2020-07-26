'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    let result = await this.app.mysql.get('article', {});
    console.log(result);
    this.ctx.body = result;
  }
  async getArticleList() {
    //toplist
    const sql1 = 'SELECT article.id  as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime," +
              'article.view_count as view_count,' +
              '.type.typeName as typeName ' +
              'FROM article LEFT JOIN type on article.type_id = type.Id ' +
              'WHERE article.isTop = 0 ' +
              'ORDER BY article.id ASC';
    const topres = await this.app.mysql.query(sql1)
    //recentpost
    let sql = 'SELECT article.id as id,'+
                 'article.title as title,'+
                 'article.introduce as introduce,'+
                 "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
                 'article.view_count as view_count ,'+
                 'article.image as image ,'+
                 'type.typeName as typeName '+
                 'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                 'WHERE article.isTop = 1  AND article.type_id <> 99 '+
                 'ORDER BY article.id DESC'
    const resList = await this.app.mysql.query(sql)
    this.ctx.body = {
      topList: topres,
      list: resList
    }
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
async getAllPartCount(){

  let sql = 'SELECT '+
        'SUM(view_count) as all_view_count '+
        'FROM article'
        
        const result = await this.app.mysql.query(sql)
        this.ctx.body={data:result}
}


}

module.exports = HomeController;
