/**
 * 隐藏手机号码
 * @param val {Number, String} 转换的字符串对象
 * @param retain {Number} 保留位数
 * @return {String}
 */
export const phone = function(val: number, retain = 4) {
  if (!Number(val) || String(val).length !== 11 || retain === 0) return val;
  const phone = String(val);
  const digit = 11 - 3 - retain;
  const reg = new RegExp(`^(\\d{3})\\d{${digit}}(\\d{${retain}})$`);
  return phone.replace(reg, `$1${"*".repeat(digit)}$2`);
};
/**
 * 格式化金额
 * @param val {Number, String} 转换的字符串对象
 * @param retain {Number} 保留位数
 * @return {String}
 * 例：2.222 => 2.22
 */
export const money = function(val: string) {
  let value = Number(val);
  if (isNaN(value)) {
    value = 0;
  }
  let isNeg = "";
  if (value < 0) {
    isNeg = "-";
    value = Math.abs(value);
  }
  let value2 = String(value);
  const pos = value2.indexOf(".");
  if (pos > 0) {
    value2 = (value2 + "00").slice(0, value2.indexOf(".") + 3);
  } else {
    value2 = value2 + ".00";
  }
  const re = /\d{1,3}(?=(\d{3})+$)/g;
  return (
    isNeg +
    value2.replace(
      /^(\d+)((\.\d+)?)$/,
      (s: any, s1: any, s2: any) => s1.replace(re, "$&,") + s2
    )
  );
};
