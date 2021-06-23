import $utilsOptions from "./Interface"
import lodash from "lodash"
export default <$utilsOptions>{
    lodash,
    isNumber(val){
        return !/^(([0-9]*)|([0-9]*\.[0-9]*))$/.test(val);
    },
    is_S(val,lng,isSatrt){
        if((<any>Object).prototype.toString.call(val) === '[object Object]'){
            return false;
        }
        if((<any>Object).prototype.toString.call(val) === '[object Array]'){
            if(typeof lng === "number"){
                return  val.length < lng;
            }else {
                return  false
            }
        }
        let is_SS = !(val && /^\S{1,}|^\s{1,}\S{1,}/.test(val));
        if(typeof lng === "boolean" || isSatrt === true){
            is_SS = !(val && /\S{1,}/.test(val));
        }
        let result = is_SS || ((val && val.length && typeof val.length == "number" && typeof lng == "number")?(val && val.length && val.length < lng):false);
        return result
    },
    isPhone(val){
        return this.is_S(val) || !/^1\d{10}$/.test(val);
    },
    //数字转中文
    number_chinese(strObj) {
        //如果数字含有小数部分，那么可以将小数部分单独取出
//将小数部分的数字转换为字符串的方法：

        var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        var chnUnitSection = ['', '万', '亿', '万亿', '亿亿'];
        var chnUnitChar = ['', '十', '百', '千'];

        var numToChn = function (num) {
            var index = num.toString().indexOf('.');
            if (index != -1) {
                var str = num.toString().slice(index);
                var a = '点';
                for (var i = 1; i < str.length; i++) {
                    a += chnNumChar[parseInt(str[i])];
                }
                return a;
            } else {
                return '';
            }
        }

//定义在每个小节的内部进行转化的方法，其他部分则与小节内部转化方法相同
        function sectionToChinese(section) {
            var str = '', chnstr = '', zero = false, count = 0;   //zero为是否进行补零， 第一次进行取余由于为个位数，默认不补零
            while (section > 0) {
                var v = section % 10;  //对数字取余10，得到的数即为个位数
                if (v == 0) {                    //如果数字为零，则对字符串进行补零
                    if (zero) {
                        zero = false;        //如果遇到连续多次取余都是0，那么只需补一个零即可
                        chnstr = chnNumChar[v] + chnstr;
                    }
                } else {
                    zero = true;           //第一次取余之后，如果再次取余为零，则需要补零
                    str = chnNumChar[v];
                    str += chnUnitChar[count];
                    chnstr = str + chnstr;
                }
                count++;
                section = Math.floor(section / 10);
            }
            return chnstr;
        }
        //定义整个数字全部转换的方法，需要依次对数字进行10000为单位的取余，然后分成小节，按小节计算，当每个小节的数不足1000时，则需要进行补零
        function TransformToChinese(num) {
            var a = numToChn(num);
            num = Math.floor(num);
            var unitPos = 0;
            var strIns = '', chnStr = '';
            var needZero = false;

            if (num === 0) {
                return chnNumChar[0];
            }
            while (num > 0) {
                var section = num % 10000;
                if (needZero) {
                    chnStr = chnNumChar[0] + chnStr;
                }
                strIns = sectionToChinese(section);
                strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
                chnStr = strIns + chnStr;
                needZero = (section < 1000) && (section > 0);
                num = Math.floor(num / 10000);
                unitPos++;
            }

            return chnStr + a;
        }

        return TransformToChinese(strObj)
    },
    dateFormat(newDate?:any,Format?:string){
        newDate = newDate || new Date();
        Format = Format || "YYYY-MM-DD HH:mm:ss week sc";
        let type = Object.prototype.toString.call(newDate);
        if(type === "[object Number]"){
            let now = new Date();
            now.setTime(newDate);
            let nowTime = now.toLocaleString().replace(/[\u2E80-\u9FFF]{1,}/,"/");
            let week = now.getDay(); //星期
            let hour = now.getHours(); //小时
            //判断星期几
            let weeks = ["日","一","二","三","四","五","六"];
            let getWeek = "星期" + weeks[week];
            //"YYYY-MM-DD HH:mm:ss week sc"
            //{ nowTime: '2019-7-7 13:18:29', getWeek: '星期日', sc: '中午' }
            let nowTimeArr:any = nowTime.replace(/\s/,"-").split("-").map(e=>e.split(/:|\//).map(item=>{
                if(item.length == 1){
                    return `0${item}`;
                }
                return item;
            })).toString().split(",");
            let sc;
            //判断是AM or PM
            if(hour >= 0 && hour < 5){
                sc = '凌晨';
            }
            else if(hour > 5 && hour <= 7){
                sc = '早上';
            }
            else if(hour > 7 && hour <= 11){
                sc = '上午';
            }
            else if(hour > 11 && hour <= 13){
                sc = '中午';
            }
            else if(hour> 13 && hour <= 18){
                sc = '下午';
            }
            else if(hour > 18 && hour <= 23){
                sc = '晚上';
            }
            nowTimeArr[3] = hour > 9? `${hour}` : `0${hour}`;
            console.log(Format,11111,nowTimeArr)
            try {
                Format = Format.replace(/week/g,getWeek);
                Format = Format.replace(/sc/g,sc);
                Format = Format.replace(/Y{4}/g,nowTimeArr[0].slice(0,4));
                Format = Format.replace(/Y{3}/g,nowTimeArr[0].slice(0,3));
                Format = Format.replace(/Y{2}/g,nowTimeArr[0].slice(0,2));
                Format = Format.replace(/Y{1}/g,nowTimeArr[0].slice(0,1));
                Format = Format.replace(/M{2}/g,nowTimeArr[1].slice(0,2));
                Format = Format.replace(/M{1}/g,nowTimeArr[1].slice(0,1));
                Format = Format.replace(/D{2}/g,nowTimeArr[2].slice(0,2));
                Format = Format.replace(/D{1}/g,nowTimeArr[2].slice(0,1));
                Format = Format.replace(/H{2}/g,nowTimeArr[3].slice(0,2));
                Format = Format.replace(/H{1}/g,nowTimeArr[3].slice(0,1));
                Format = Format.replace(/m{2}/g,nowTimeArr[4].slice(0,2));
                Format = Format.replace(/m{1}/g,nowTimeArr[4].slice(0,1));
                Format = Format.replace(/s{2}/g,nowTimeArr[5].slice(0,2));
                Format = Format.replace(/s{1}/g,nowTimeArr[5].slice(0,1));
            }catch (e) {
                // err
            }

        }else if (type === "[object Date]" || type === "[object String]"){
            return this.dateFormat(new Date(newDate).getTime(),Format);
        }
        return Format;
    },
    addJs(src:string){
        return new Promise(resolve => {
            if(document.getElementById(src)){
                resolve();
                return ;
            }
            const js = document.createElement("script");
            js.id = src;
            js.src = src;
            document.body.appendChild(js)
            js.onload = ()=>{
                setTimeout(()=>{
                    resolve();
                });
            }
            js.onerror = ()=>{
                this.addJs(src).then(()=>{
                    setTimeout(()=> {
                        resolve();
                    });
                })
            }
        })
    },
}