const admin = {
  isMobile(value: string): boolean {
    /* 是否是手机号号 */
    // eslint-disable-next-line
    return /^[1][2,3,4,5,6,7,8,9,0][0-9]{9}$/.test(value);
  },
  isIdNumber(value: string): boolean {
    /* 是否是身份证号 */
    // eslint-disable-next-line
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
  },
  isEmail(value: string): boolean {
    /* 是否是邮箱 */
    // eslint-disable-next-line
    return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value);
  },
  isURL(value: string): boolean {
    /* 是否是URL */
    // eslint-disable-next-line
    return /^http(s)?:\/\//.test(value);
  },
  sleep(time: number): Promise<any> {
    return new Promise((resolve: Function) => {
      setTimeout(resolve, time);
    });
  },
  integer(value: string, mode: number) {
    /* 只能输入正整数 or 保留小数点后2位 or 保留小数点后1位 */
    // mode:1 只能输入整数 2：保留小数点后面2位 3：保留小数点后面1位
    let v;
    switch (mode) {
      case 1:
        v = value.replace(/[^0-9]/g, "");
        break;
      case 2:
        v = value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, "$1");
        break;
      case 3:
        v = value.replace(/^\D*(\d*(?:\.\d{0,1})?).*$/g, "$1");
        break;
      default:
        break;
    }
    return v;
  },
  add(num1: string | number, num2: string | number) {
    // 加法
    let sq1;
    let sq2;
    try {
      sq1 = num1.toString().split(".")[1].length;
    } catch (e) {
      sq1 = 0;
    }
    try {
      sq2 = num2.toString().split(".")[1].length;
    } catch (e) {
      sq2 = 0;
    }
    const m = 10 ** Math.max(sq1, sq2);
    return (Number(num1) * m + Number(num2) * m) / m;
  },
  sub(num1: string | number, num2: string | number) {
    // 减法
    let r1;
    let r2;
    try {
      r1 = num1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = num2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    const m = 10 ** Math.max(r1, r2);
    return (Number(num1) * m - Number(num2) * m) / m;
  },
  mul(num1: string | number, num2: string | number) {
    // 乘法
    let m = 0;
    let s1;
    let s2;
    try {
      s1 = num1.toString();
      const splits = s1.split(".");
      m += splits[1] ? splits[1].length : 0;
    } catch (e) {
      s1 = "NaN";
    }
    try {
      s2 = num2.toString();
      const splits = s2.split(".");
      m += splits[1] ? splits[1].length : 0;
    } catch (e) {
      s2 = "NaN";
    }
    // eslint-disable-next-line
    return (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) / 10 ** m;
  },
  div(num1: string | number, num2: string | number) {
    // 除函数
    let t1 = 0;
    let t2 = 0;
    try {
      t1 = num1.toString().split(".")[1].length;
    } catch (e) {
      // error
    }
    try {
      t2 = num2.toString().split(".")[1].length;
    } catch (e) {
      // error
    }
    const r1 = Number((num1 + "").replace(".", ""));
    const r2 = Number((num2 + "").replace(".", ""));
    return (r1 / r2) * 10 ** (t2 - t1);
  },
  changeNumMoneyToChinese(money: any) {
    // 格式化数字金额转化汉字金额
    const cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    const cnIntRadice = ["", "拾", "佰", "仟"];
    const cnIntUnits = ["", "万", "亿", "兆"];
    const cnDecUnits = ["角", "分", "毫", "厘"];
    const cnInteger = "整";
    const cnIntLast = "元";
    const maxNum = 999999999999999.9999;
    let IntegerNum;
    let DecimalNum;
    let ChineseStr = "";
    let parts;
    if (money === "") {
      return "";
    }
    money = parseFloat(money);
    if (money >= maxNum) {
      console.log("超出最大处理数字");
      return "";
    }
    if (money === 0) {
      ChineseStr = cnNums[0] + cnIntLast + cnInteger;
      return ChineseStr;
    }
    money = money.toString();
    if (money.indexOf(".") === -1) {
      IntegerNum = money;
      DecimalNum = "";
    } else {
      parts = money.split(".");
      IntegerNum = parts[0];
      DecimalNum = parts[1].substr(0, 4);
    }
    if (parseInt(IntegerNum, 10) >= 0) {
      if (IntegerNum === "0") {
        ChineseStr = "零";
      } else {
        let zeroCount = 0;
        const IntLen = IntegerNum.length;
        for (let i = 0; i < IntLen; i++) {
          const n = IntegerNum.substr(i, 1);
          const p = IntLen - i - 1;
          const q = p / 4;
          const m = p % 4;
          if (n === "0") {
            zeroCount++;
          } else {
            if (zeroCount > 0) {
              ChineseStr += cnNums[0];
            }
            zeroCount = 0;
            ChineseStr += cnNums[parseInt(n, 10)] + cnIntRadice[m];
          }
          if (m === 0 && zeroCount < 4) {
            ChineseStr += cnIntUnits[q];
          }
        }
      }
      ChineseStr += cnIntLast;
      if (DecimalNum !== "") {
        const decLen = DecimalNum.length;
        for (let i = 0; i < decLen; i++) {
          const n = DecimalNum.substr(i, 1);
          if (n !== "0") {
            ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
          }
        }
      }
      if (ChineseStr === "") {
        ChineseStr += cnNums[0] + cnIntLast + cnInteger;
      } else if (DecimalNum === "") {
        ChineseStr += cnInteger;
      }
      return ChineseStr;
    }
  },
  getBetween(day: number) {
    // 取n天之前
    const dd = new Date();
    dd.setDate(dd.getDate() + -day); // 获取p_count天后的日期
    const y = dd.getFullYear();
    let m = dd.getMonth() + 1; // 获取当前月份的日期
    if (m < 10) {
      // @ts-ignore
      m = "0" + m;
    }
    let d = dd.getDate();
    if (d < 10) {
      // @ts-ignore
      d = "0" + d;
    }
    return y + "-" + m + "-" + d;
  }
};

export default admin;
