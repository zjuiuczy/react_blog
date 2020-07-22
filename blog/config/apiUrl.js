let ipUrl = 'http://127.0.0.1:7001/default/' 

let servicePath = {
    getArticleList:ipUrl + 'getArticleList' ,  //  Main page articles list
    getArticleById:ipUrl + 'getArticleById/',  // Article detials, requiring id
    getTypeInfo:ipUrl + 'getTypeInfo/', // article type info
    getListById:ipUrl + 'getListById/' , // get article list by type Id
    getAllPartCount: ipUrl + 'getAllPartCount',
}
export default servicePath;