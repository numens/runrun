/*
 * @Author: lxk0301 https://github.com/lxk0301
 * @Date: 2020-08-19 16:12:40
 * @Last Modified by: liuhaoxing
 * @Last Modified time: 2022-05-19 07:43:50
 */
const axios = require('axios');
const qs = require('qs');
// =======================================微信server酱通知设置区域===========================================
//此处填你申请的SCKEY.
//注：此处设置github action用户填写到Settings-Secrets里面(Name输入PUSH_KEY)
let SCKEY = '';

// =======================================QQ酷推通知设置区域===========================================
//此处填你申请的SKEY(具体详见文档 https://cp.xuthus.cc/)
//注：此处设置github action用户填写到Settings-Secrets里面(Name输入QQ_SKEY)
let QQ_SKEY = '';
//此处填写私聊或群组推送，默认私聊(send[私聊]、group[群聊]、wx[个微]、ww[企微]、email[邮件])
let QQ_MODE = 'send';

// =======================================Bark App通知设置区域===========================================
//此处填你BarkAPP的信息(IP/设备码，例如：https://api.day.app/XXXXXXXX)
//注：此处设置github action用户填写到Settings-Secrets里面（Name输入BARK_PUSH）
let BARK_PUSH = '';
//BARK app推送铃声,铃声列表去APP查看复制填写
//注：此处设置github action用户填写到Settings-Secrets里面（Name输入BARK_SOUND , Value输入app提供的铃声名称，例如:birdsong）
let BARK_SOUND = '';

// =======================================telegram机器人通知设置区域===========================================
//此处填你telegram bot 的Token，例如：1077xxx4424:AAFjv0FcqxxxxxxgEMGfi22B4yh15R5uw
//注：此处设置github action用户填写到Settings-Secrets里面(Name输入TG_BOT_TOKEN)
let TG_BOT_TOKEN = '';
//此处填你接收通知消息的telegram用户的id，例如：129xxx206
//注：此处设置github action用户填写到Settings-Secrets里面(Name输入TG_USER_ID)
let TG_USER_ID = '';

// =======================================钉钉机器人通知设置区域===========================================
//此处填你钉钉 bot 的webhook，例如：5a544165465465645d0f31dca676e7bd07415asdasd
//注：此处设置github action用户填写到Settings-Secrets里面(Name输入DD_BOT_TOKEN)
let DD_BOT_TOKEN = '';
//密钥，机器人安全设置页面，加签一栏下面显示的SEC开头的字符串
let DD_BOT_SECRET = '';

// =======================================企业微信机器人通知设置区域===========================================
//此处填你企业微信机器人的 webhook(详见文档 https://work.weixin.qq.com/api/doc/90000/90136/91770)，例如：693a91f6-7xxx-4bc4-97a0-0ec2sifa5aaa
//注：此处设置github action用户填写到Settings-Secrets里面(Name输入QYWX_KEY)
let QYWX_KEY = '';

// =======================================企业微信应用消息通知设置区域===========================================
//此处填你企业微信应用消息的 值(详见文档 https://work.weixin.qq.com/api/doc/90000/90135/90236)，依次填上corpid的值,corpsecret的值,touser的值,agentid的值，素材库图片id（见https://github.com/lxk0301/jd_scripts/issues/519) 注意用,号隔开，例如：wwcff56746d9adwers,B-791548lnzXBE6_BWfxdf3kSTMJr9vFEPKAbh6WERQ,mingcheng,1000001,2COXgjH2UIfERF2zxrtUOKgQ9XklUqMdGSWLBoW_lSDAdafat
//增加一个选择推送消息类型，用图文消息直接填写素材库图片id的值，用卡片消息就填写0(就是数字零)
//注：此处设置github action用户填写到Settings-Secrets里面(Name输入QYWX_AM)
let QYWX_AM = '';

// =======================================iGot聚合推送通知设置区域===========================================
//此处填您iGot的信息(推送key，例如：https://push.hellyw.com/XXXXXXXX)
//注：此处设置github action用户填写到Settings-Secrets里面（Name输入IGOT_PUSH_KEY）
let IGOT_PUSH_KEY = '';

// =======================================push+设置区域=======================================
//官方文档：https://pushplus.hxtrip.com/
//PUSH_PLUS_TOKEN：微信扫码登录后一对一推送或一对多推送下面的token(您的Token)，不提供PUSH_PLUS_USER则默认为一对一推送
//PUSH_PLUS_USER： 一对多推送的“群组编码”（一对多推送下面->您的群组(如无则新建)->群组编码，如果您是创建群组人。也需点击“查看二维码”扫描绑定，否则不能接受群组消息推送）
let PUSH_PLUS_TOKEN = '';
let PUSH_PLUS_USER = '';

//==========================云端环境变量的判断与接收=========================
if (process.env.PUSH_KEY) {
    SCKEY = process.env.PUSH_KEY;
}

if (process.env.QQ_SKEY) {
    QQ_SKEY = process.env.QQ_SKEY;
}

if (process.env.QQ_MODE) {
    QQ_MODE = process.env.QQ_MODE;
}

if (process.env.BARK_PUSH) {
    if (
        process.env.BARK_PUSH.indexOf('https') > -1 ||
        process.env.BARK_PUSH.indexOf('http') > -1
    ) {
        //兼容BARK自建用户
        BARK_PUSH = process.env.BARK_PUSH;
    } else {
        BARK_PUSH = `https://api.day.app/${process.env.BARK_PUSH}`;
    }
    if (process.env.BARK_SOUND) {
        BARK_SOUND = process.env.BARK_SOUND;
    }
} else {
    if (
        BARK_PUSH &&
        BARK_PUSH.indexOf('https') === -1 &&
        BARK_PUSH.indexOf('http') === -1
    ) {
        //兼容BARK本地用户只填写设备码的情况
        BARK_PUSH = `https://api.day.app/${BARK_PUSH}`;
    }
}
if (process.env.TG_BOT_TOKEN) {
    TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
}
if (process.env.TG_USER_ID) {
    TG_USER_ID = process.env.TG_USER_ID;
}

if (process.env.DD_BOT_TOKEN) {
    DD_BOT_TOKEN = process.env.DD_BOT_TOKEN;
    if (process.env.DD_BOT_SECRET) {
        DD_BOT_SECRET = process.env.DD_BOT_SECRET;
    }
}

if (process.env.QYWX_KEY) {
    QYWX_KEY = process.env.QYWX_KEY;
}

if (process.env.QYWX_AM) {
    QYWX_AM = process.env.QYWX_AM;
}

if (process.env.IGOT_PUSH_KEY) {
    IGOT_PUSH_KEY = process.env.IGOT_PUSH_KEY;
}

if (process.env.PUSH_PLUS_TOKEN) {
    PUSH_PLUS_TOKEN = process.env.PUSH_PLUS_TOKEN;
}
if (process.env.PUSH_PLUS_USER) {
    PUSH_PLUS_USER = process.env.PUSH_PLUS_USER;
}
//==========================云端环境变量的判断与接收=========================

async function sendNotify(text, desp, params = {}) {
    serverNotify(text, desp); //微信server酱
}

function serverNotify(text, desp = '结果', timeout = 2100) {
    return new Promise((resolve) => {
        console.log(SCKEY);
        if (SCKEY) {
            //微信server酱推送通知一个\n不会换行，需要两个\n才能换行，故做此替换
            // desp = desp.replace(/[\n\r]/g, '\n\n');
            axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: qs.stringify({
                    title: text,
                    desp: desp,
                }),
                url: `https://sctapi.ftqq.com/${SCKEY}.send`,
            })
                .then(() => {
                    resolve();
                })
                .catch(() => {});
        } else {
            console.log('您未提供server酱的SCKEY，取消微信推送消息通知\n');
            resolve();
        }
    });
}

module.exports = {
    sendNotify,
    BARK_PUSH,
};

