let ipUrl = 'http://127.0.0.1:7001/admin/' 

let servicePath = {
    checkLogin : ipUrl + 'checklogin', // check username and password
    getTypeInfo: ipUrl + 'getTypeInfo', // get article type
    addArticle:ipUrl + 'addArticle' ,  //  add article
    updateArticle:ipUrl + 'updateArticle' , // update article
    getArticleList:ipUrl + 'getArticleList' ,  //  get article list
    delArticle:ipUrl + 'delArticle/' ,  //  delete article
    getArticleById:ipUrl + 'getArticleById/' ,  //  get article by id
}
export default servicePath;