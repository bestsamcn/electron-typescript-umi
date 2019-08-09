/**
 * 工具库
 */


export default class Tool {

    /**
     * 是否是移动端
     * @type {Boolean}
     */
    static isMobile = ():boolean=>{
        var b = false;
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = !!sUserAgent.match(/ipad/i) && sUserAgent.match(/ipad/i)![0]  =="ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) && sUserAgent.match(/iphone os/i)![0] == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) && sUserAgent.match(/midp/i)![0] == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) && sUserAgent.match(/rv:1.2.3.4/i)![0] == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) && sUserAgent.match(/ucweb/i)![0] == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) && sUserAgent.match(/android/i)![0] == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) && sUserAgent.match(/windows ce/i)![0] == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) && sUserAgent.match(/windows mobile/i)![0] == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            b = true;
        }
        return b
    }

    /**
     * 设置cookie
     * @param {string} k 键名
     * @param {string} v 值
     * @param {number} d 天数
     */
    static setCookie = function(k:string, v:string|boolean, d:number) {
        var expire = '';
        if (d) {
            var date = new Date();
            date.setTime(date.getTime() + d * 24 * 60 * 60 * 1000);
            expire = ';expires=' + date.toUTCString();
        }
        document.cookie = k + '=' + v + expire;
    }

    /**
     * 获取cookie
     * @param {string} k 键名
     * @return {v} 键值
     */
    static getCookie = function(k:string) {
        //一旦检测到分号，即停止
        var arr = document.cookie.match(new RegExp(k + '=([^;]*)'));
        return arr ? arr[1] : '';
    }

    /**
     * 清除cookie
     * @param {string} k 键名
     */
    static clearCookie = function(k:string) {
        Tool.setCookie(k, '', -1);
    }

     /**
     * 获取css样式值
     * @param  {HTMLElement} element
     * @param  {string} attr    属性名
     * @return {string}
     */
    static getStyle = function(element:HTMLElement, attr:any) {
        return getComputedStyle(element, null)![attr];
    }

    /**
     * 运动函数
     * @param  {any}   obj
     * @param  {any}   json 运动参数
     * @param  {function} fn   回调
     */
    static moveStart = (obj:any, json:any, fn?:Function)=>{
        var that = Tool;
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var bStop = true;
            var icur = 0;
            icur = parseInt(that.getStyle(obj, 'top'));
            var iSpeed = (json['top'] - icur) / 8;
            // alert('iSpeed'+iSpeed)
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (icur != json['top']) {
                bStop = false;
            }
            obj.style['top'] = icur + iSpeed + 'px';
            if (bStop) {
                clearInterval(obj.timer);
                fn && fn();
            }
        }, 30);
    }

    /**
    *@function toScrollHeight 跳到指定滚动条高度
    *@param iTarget {number} 指定滚动条高度 例如:300
    *@param obj {object} 触发该方法的对象
    *@example toScrollHeight(300,document.getElementId('obj'))
    */
    static toScrollHeight = function(iTarget:any, obj:any){
        var that = Tool;
        var iTimer:any;
        var b = 0;
        //不能放在scroll时间里，否则无滚动，不能点击
        if(obj !== 'undefined'){
            obj!.addEventListener('click',function(){
                clearInterval(iTimer);
                runFn(iTarget);
            });
        }
        window.addEventListener('scroll',function(){
            if (b != 1) {
                clearInterval(iTimer);
            }
            b = 2;
        });
        function runFn(iTarget:any) {
            clearInterval(iTimer);
            var iSpeed = 0 ;
            var iCur = 0;
            iTimer = setInterval(function() {
                iCur = document.documentElement.scrollTop || document.body.scrollTop;
                //一直没想到会是这步的原因,由于放向的不同,取值会不同,ceil是为了向下滚动,为正数,floor是为了向上滚动,为负数
                iSpeed = iSpeed > 0 ?  Math.ceil((iTarget - iCur) / 7) : Math.floor((iTarget -iCur)/7);
                if (iCur != iTarget) {
                    document.documentElement.scrollTop = document.body.scrollTop = iCur + iSpeed;
                } else {
                    clearInterval(iTimer);
                }
                b = 1;
            }, 30);
        }
    }

}

