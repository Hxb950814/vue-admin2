import admin from "@/utils/index.ts";

type TypeErrorCallBack = (param?: undefined | Error) => void;

/* 校验密码是否合法 */
/*
 *   param = {}
 * */
export function getValidatePassword(params?: any) {
  return (rule: any, value: string, callback: TypeErrorCallBack) => {
    if (value === "") {
      callback(new Error("请输入"));
    } else if (value.length < 8) {
      callback(new Error("密码长度不能小于8位"));
    } else if (value.length > 16) {
      callback(new Error("密码长度不能大于8位"));
    } else if (!/^[0-9a-zA-Z]*$/.test(value)) {
      callback(new Error("密码必须是字母和数组的组合"));
    } else {
      callback();
    }
  };
}

/* 校验手机号是否合法 */
/*
 *   param = {
 *       allowEmpty: false // 不允许空
 *   }
 * */
export function getValidateMobile(params?: any) {
  return (rule: any, value: string, callback: TypeErrorCallBack) => {
    const { allowEmpty = false } = params || {};
    if (value === "") {
      if (allowEmpty) {
        callback();
      } else {
        callback(new Error("请输入"));
      }
    } else if (!admin.isMobile(value)) {
      callback(new Error("请输入正确的手机号"));
    } else {
      callback();
    }
  };
}

/* 校验邮箱是否合法 */
/*
 *   param = {
 *       allowEmpty: false // 不允许空
 *   }
 * */
export function getValidateEmail(params?: any) {
  return (rule: any, value: string, callback: TypeErrorCallBack) => {
    const { allowEmpty = false } = params || {};
    if (value === "") {
      if (allowEmpty) {
        callback();
      } else {
        callback(new Error("请输入"));
      }
    } else if (value && !admin.isEmail(value)) {
      callback(new Error("请输入正确的邮箱"));
    } else {
      callback();
    }
  };
}

/* 校验身份证是否合法 */
/*
 *   param = {
 *       allowEmpty: false // 不允许空
 *   }
 * */
export function getValidateIdCard(params?: any) {
  return (rule: any, value: string, callback: TypeErrorCallBack) => {
    const { allowEmpty = false } = params || {};
    if (value === "") {
      if (allowEmpty) {
        callback();
      } else {
        callback(new Error("请输入"));
      }
    } else if (value.length !== 18) {
      callback(new Error("身份证号长度为18位"));
    } else if (!admin.isIdNumber(value)) {
      callback(new Error("请输入正确的身份证号"));
    } else {
      callback();
    }
  };
}

/* 校验整数 */
/*
 *   param = {
 *       allowEmpty: false  // 不允许空
 *       allowNegative: true // 允许负数 默认为true
 *   }
 * */
export function getValidateInteger(param?: any) {
  return (rule: any, value: string, callback: TypeErrorCallBack) => {
    const { allowNegative = true, allowEmpty = false } = param || {}; // 精度默认为两位
    if (value === "") {
      if (allowEmpty) {
        callback();
      } else {
        callback(new Error("请输入"));
        return;
      }
    }
    const val = Number(value);
    if (Number.isNaN(val)) {
      callback(new Error("请输入数字类型"));
      return;
    }
    if (
      String(value)
        .toString()
        .includes(".")
    ) {
      callback(new Error("请输入整数"));
      return;
    }
    if (allowNegative) {
      if (val < 0) {
        callback(new Error("请输入大于0的数字"));
        return;
      }
    }
    callback();
  };
}

/* 校验小数 */
/*
 *   param = {
 *       allowNegative: true // 允许负数 默认为true
 *       precision： 2 // 小数点最多精确
 *   }
 * */
export function getValidateFloat(param?: any) {
  return (rule: any, value: string | number, callback: TypeErrorCallBack) => {
    if (value === "" || value === undefined || value === null) {
      callback(new Error("请输入"));
      return;
    }
    const val = Number(value);
    if (Number.isNaN(val)) {
      callback(new Error("请输入数字类型"));
      return;
    }
    const { precision = 2, allowNegative = true } = param || {}; // 精度默认为两位
    if (!allowNegative) {
      if (val < 0) {
        callback(new Error("请输入大于0的数字"));
        return;
      }
    }
    const splits = String(value).split(".");
    if (splits && splits[1] && splits[1].length > precision) {
      callback(new Error(`请输入${precision}位小数`));
      return;
    }
    callback();
  };
}

/* 校验指定大于或小于的数 */
/*
 *   param = {
 *       number: -Infinite // 参考值默认 负无限
 *       compareType： '>' // 比较操作符  > 或者 <
 *   }
 * */
export function getValidateSpecialNumber(param?: any) {
  return (rule: any, value: string | number, callback: TypeErrorCallBack) => {
    const val = Number(value);
    if (Number.isNaN(val)) {
      callback(new Error("请输入数字类型"));
      return;
    }
    const { number = -Infinity, compareType = ">" } = param || {};
    if (compareType === ">" || compareType === "gt") {
      // 大于
      if (val <= number) {
        callback(new Error(`请输入大于${number}的数`));
        return;
      }
    } else if (compareType === ">=" || compareType === "gte") {
      // 大于等于
      if (val < number) {
        callback(new Error(`请输入大于或等于${number}的数`));
        return;
      }
    } else if (compareType === "<" || compareType === "lt") {
      // 小于
      if (val >= number) {
        callback(new Error(`请输入小于${number}的数`));
        return;
      }
    } else if (compareType === "<=" || compareType === "lte") {
      // 小于等于
      if (val > number) {
        callback(new Error(`请输入小于或等于${number}的数`));
        return;
      }
    }
    callback();
  };
}

/* 校验金额 */
/*
 *   param = {
 *       allowEmpty:  false // 是否允许空，默认: false
 *       allowZero: true, // 是否允许0，默认允许true
 *       precision: 2 // 精度，参考值默认 2
 *   }
 * */
export function getValidateMoney(param?: any) {
  return (rule: any, value: string | number, callback: TypeErrorCallBack) => {
    const { precision = 2, allowEmpty = false, allowZero = true } = param || {};
    if (value === "") {
      if (!allowEmpty) {
        callback(new Error("请输入"));
      } else {
        callback();
      }
      return;
    }
    const val = Number(value);
    if (Number.isNaN(val)) {
      callback(new Error("请输入数字类型"));
      return;
    }
    if (val < 0) {
      callback(new Error("请输入大于0的数"));
      return;
    } else if (val === 0 && !allowZero) {
      callback(new Error("请输入大于0的数"));
      return;
    }
    const splits = String(value).split(".");
    if (splits && splits[1] && splits[1].length > precision) {
      callback(new Error(`请输入${precision}位小数`));
      return;
    }
    callback();
  };
}

/*
校验字符串全是中文
*   param = {
*       allowEmpty: false  // 不允许空
*
*   }
*/
export function getValidateAllChinese(param?: any) {
  return (rule: any, value: string, callback: TypeErrorCallBack) => {
    const { allowEmpty = false } = param || {}; // 精度默认为两位
    if (value === "") {
      if (allowEmpty) {
        callback();
      } else {
        callback(new Error("请输入"));
      }
    } else if (!/^[(\u4E00-\u9FA5)]+$/.test(value)) {
      callback(new Error("请输入中文字符"));
    } else {
      callback();
    }
  };
}
/*
 * 校验字符串长度
 * *   param = {
 *       maxLength: Infinity  // 最大长度
 *       minLength: 1  // 最小长度
 *   }
 * */
export function getValidateStringLength(param?: any) {
  return (rule: any, value: string, callback: TypeErrorCallBack) => {
    const { maxLength = Infinity, minLength = 1 } = param || {}; // 精度默认为两位
    if (value === "") {
      return callback(new Error("请输入"));
    } else if (value.length < minLength || value.length > maxLength) {
      if (maxLength === Infinity) {
        return callback(new Error(`字符串长度不能小于${minLength}`));
      } else {
        return callback(new Error(`字符串长度为${minLength}~${maxLength}之间`));
      }
    }
    return callback();
  };
}
