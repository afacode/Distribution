
const goAuthor= function (){
    window.location.href = "/admin/boba/wechat/login?originUrl="+encodeURIComponent(window.location.href);
}

function getCookie(cookieName) {
    var arr,reg=new RegExp("(^| )"+cookieName+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
           
}

export default {goAuthor,getCookie}
