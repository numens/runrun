const axios = require("axios");

async function isRestDayFn() {
  try {
    const { data } = await axios({
      method: "GET",
      url: `http://api.tianapi.com/jiejiari/idex?key=4c681cb1ff42d298da65cf6db1b0a4&date=2023-10-12`,
    });
    // console.log(data);
    if (data.code === 200) {
      const { newslist } = data;
      const { isnotwork } = newslist[0]; // 0为工作日，1为休息日
      return !!isnotwork;
    } else {
      return true;
    }
  } catch (e) {
    console.log("节假日接口", e);
    return true;
  }
}
async function a() {
  const res = await isRestDayFn();
  console.log(res);
}
a();
