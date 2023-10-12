const axios = require("axios");
const qs = require("qs");
const CryptoJS = require("./crypto.js");
const notify = require("./sendNotify");

var imie = process.env.imie;
var token = process.env.token;
var psncode = process.env.psncode;

const key = CryptoJS.enc.Utf8.parse("zywyzywyzywyzywy");
const iv = CryptoJS.enc.Utf8.parse("0311031103110311");

var dateObj = new Date();
var dateMs = +dateObj;
var year = new Date().getFullYear();
var month = new Date().getMonth() + 1;
var day = new Date().getDate();
var today = `${year}/${month}/${day}`;

var DateNow = dateFormat("YYYY/mm/dd HH:MM:SS", dateObj);
var DayNow = dateFormat("YYYY-mm-dd", dateObj);

var bzkqsj = "17:30:00";
var time700 = new Date(`${today} 07:00:00`);
var time830 = new Date(`${today} 08:30:00`);
var time1730 = new Date(`${today} 17:30:00`);
var time2359 = new Date(`${today} 23:59:00`);

if (dateMs > +time700 && dateMs < +time830) {
  bzkqsj = "08:30:00";
} else if (dateMs > +time1730 && dateMs < +time2359) {
  bzkqsj = "17:30:00";
}

var kqbs = "1";
if (bzkqsj == "08:30:00") {
  kqbs = "1";
} else {
  kqbs = "2";
}

var kqsj = dateFormat("HH:MM:SS", dateObj);

var sjdbs = "1";
if (bzkqsj == "08:30:00") {
  sjdbs = "1";
} else {
  sjdbs = "2";
}

var x1 = Math.floor(Math.random() * 300);
var x2 = Math.floor(Math.random() * 300);
var offset1 = x1 / 1000000.0 - 0.00015;
var offset2 = x2 / 1000000.0 - 0.00015;
var kqwd = 23.005897 + offset1;
var kqjd = 113.741792 + offset2;

/* var params = `${DateNow}###{
    "kqbs" : "${kqbs}",
    "sxbsjid" : "6279A1100000000000S0",
    "kqwd" : "${kqwd}",
    "sfzt" : "0",
    "bzkqsj" : "${bzkqsj}",
    "bzid" : "8a8349be76230fb6017627a7222a4cac",
    "bcid" : "",
    "sjdbs" : "${sjdbs}",
    "imie" : "${dict['imie']}",
    "token" : "${dict['token']}",
    "kqjd" : "${kqjd}",
    "kqsj" : "${kqsj}",
    "psncode" : "${dict['psncode']}",
    "bztype" : "2",
    "content" : "",
    "cqlx" : "0",
    "wz" : "",
    "bzkqrq" : "${DayNow}"
}`; */

var params = `${DateNow}###{
    "kqbs" : "${kqbs}",
    "sxbsjid" : "6279A1100000000000S0",
    "kqwd" : "${kqwd}",
    "sfzt" : "0",
    "bzkqsj" : "${bzkqsj}",
    "bzid" : "8a8349be76230fb6017627a7222a4cac",
    "bcid" : "",
    "sjdbs" : "${sjdbs}",
    "imie" : "${imie}",
    "token" : "${token}",
    "kqjd" : "${kqjd}",
    "kqsj" : "${kqsj}",
    "psncode" : "${psncode}",
    "bztype" : "2",
    "content );" : "",
    "cqlx" : "0",
    "wz" : ""
}`;

console.log(params);
var paramStr = Encrypt(params);
// document.write(paramStr);

//解密方法
function Decrypt(word) {
  let temp = CryptoJS.enc.Base64.parse(word).toString();
  let encryptedHexStr = CryptoJS.enc.Hex.parse(temp);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

//加密方法
function Encrypt(word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  let result = encrypted.ciphertext.toString();
  let hex = CryptoJS.enc.Hex.parse(result);
  return CryptoJS.enc.Base64.stringify(hex);
}

// console.log(Decrypt(Encrypt('hello world')));

// 格式化时间
function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}

//解密方法
function Decrypt(word) {
  // debugger
  let temp = CryptoJS.enc.Base64.parse(word).toString();
  let encryptedHexStr = CryptoJS.enc.Hex.parse(temp);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

async function isRestDayFn() {
  try {
    const { data } = await axios({
      method: "GET",
      url: `http://api.tianapi.com/jiejiari/index?key=4c681cb1ff42d298da65cf6f6db1b0a4&date=${DayNow}`,
    });
    // console.log(data);
    if (data.code === 200) {
      const { newslist } = data;
      const { isnotwork } = newslist[0]; // 0为工作日，1为休息日
      return !!isnotwork;
    } else {
      notify.sendNotify("接口错误，请手动签到！！！");
      return true;
    }
  } catch (e) {
    console.log("节假日接口", e);
    notify.sendNotify("接口错误，请手动签到！！！");
    return true;
  }
}

async function sign() {
  const data = { param: paramStr };
  const isRestDay = await isRestDayFn();
  if (isRestDay) {
    return notify.sendNotify("今天休息～");
  }
  axios({
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent":
        "you zheng yuan gong zi zhu/2.02 (iPhone; iOS 14.2; Scale/3.00)",
    },
    data: qs.stringify(data),
    url: "https://gsgl.cpoc.cn/workinghours/appkq/gsxt_bckqsj_mq",
  })
    .then((res) => {
      var resultStr = JSON.stringify(res.data);
      resultStr = resultStr.replace(/\n/g, "").replace(/\\/g, "");
      var resultBase64 = JSON.parse(resultStr).result;
      // console.log(resultBase64);
      var result = Decrypt(resultBase64);
      var rtnmsg = JSON.parse(result).rtnmsg;
      console.log(rtnmsg);
      notify.sendNotify(rtnmsg);
    })
    .catch((e) => {
      console.log(e);
    });
}

sign();
