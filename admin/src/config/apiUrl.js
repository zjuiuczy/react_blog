let ipUrl = 'http://127.0.0.1:7001/admin/' 

let servicePath = {
    checkLogin : ipUrl + 'checklogin', // check username and password
    getTypeInfo: ipUrl + 'getTypeInfo', // get article type
    addArticle:ipUrl + 'addArticle' ,  //  add article
    updateArticle:ipUrl + 'updateArticle' , // update article
}
export default servicePath;