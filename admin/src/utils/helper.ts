/* 工具类辅助函数库 */
/* 生成时间联动校验配置 */
// @ts-ignore
import dayjs from "dayjs";
import { merge } from "lodash";
import { LoginModule } from "@/store/modules/user/login";

function yesterdayStart(val: dayjs.ConfigType): number {
  return dayjs(val)
    .subtract(1, "day")
    .hour(0)
    .minute(0)
    .second(0)
    .valueOf(); // 昨天的的00:00:00
}

function yesterdayEnd(val: dayjs.ConfigType): number {
  return dayjs(val)
    .subtract(1, "day")
    .hour(23)
    .minute(59)
    .second(59)
    .valueOf(); // 昨天的的23:59:59
}

function todayStart(val: dayjs.ConfigType): number {
  return dayjs(val)
    .hour(0)
    .minute(0)
    .second(0)
    .valueOf(); // 今天的00:00:00
}

function todayEnd(val: dayjs.ConfigType): number {
  return dayjs(val)
    .hour(23)
    .minute(59)
    .second(59)
    .valueOf(); // 今天的23:59:59
}

/* 单个时间限制 */
export function makeDatePickerLimit(
  nowTime = new Date(),
  isLater = true /* 是否只允许大于前面的时间 */
) {
  return (time: Date) => {
    if (isLater) {
      return time.valueOf() < yesterdayEnd(nowTime);
    }
    return time.valueOf() > todayStart(nowTime.valueOf());
  };
}

/* 2或4个时间联动 */
export function makeDatePickerRelationLimit(
  dataObj: any,
  keysArr: Array<string>,
  options?: any
) {
  if (typeof dataObj !== "object") {
    throw new TypeError("时间联动校验函数第一个参数必须是一个对象");
  }
  if (!Array.isArray(keysArr)) {
    throw new TypeError("时间联动校验函数第二个参数必须是字符串数组");
  }
  if (!(keysArr.length === 4 || keysArr.length === 2)) {
    throw new Error("时间联动校验函数必须是长度为2或4的字符串数组");
  }
  for (const i in keysArr) {
    if (keysArr.hasOwnProperty(i)) {
      if (dataObj[keysArr[i]] === undefined) {
        throw new Error(
          "时间联动校验函数第2个参数的成员必须有被声明为非undefined"
        );
      }
    }
  }

  const newOptions = merge(
    {
      overlap: true // 时间是否允许重叠
    },
    options || {}
  );
  const key1 = keysArr[0];
  const key2 = keysArr[1];
  const key3 = keysArr[2];
  const key4 = keysArr[3];
  if (keysArr.length === 2) {
    return [
      (time: Date) => {
        let ret = false;
        const timeStamp = time.getTime(); // 当前时间戳
        const timeVal = dataObj[key2]; // 另外一个时间
        if (timeVal) {
          ret =
            ret ||
            timeStamp >
              (newOptions.overlap
                ? todayStart(timeVal)
                : yesterdayStart(timeVal));
        }
        return ret;
      },
      (time: Date) => {
        let ret = false;
        const timeStamp = time.getTime();
        const timeVal = dataObj[key1];
        if (timeVal) {
          ret =
            ret ||
            timeStamp <
              (newOptions.overlap ? yesterdayEnd(timeVal) : todayEnd(timeVal));
        }
        return ret;
      }
    ];
  }
  return [
    (time: Date) => {
      let ret = false;
      const timeStamp = time.getTime();
      if (dataObj[key4]) {
        ret = ret || timeStamp > todayStart(dataObj[key4]);
      }
      if (dataObj[key3]) {
        ret = ret || timeStamp > todayStart(dataObj[key3]);
      }
      if (dataObj[key2]) {
        ret = ret || timeStamp > todayStart(dataObj[key2]);
      }
      return ret;
    },
    (time: Date) => {
      let ret = false;
      const timeStamp = time.getTime();
      if (dataObj[key4]) {
        ret = ret || timeStamp > todayStart(dataObj[key4]);
      }
      if (dataObj[key3]) {
        ret = ret || timeStamp > todayStart(dataObj[key3]);
      }
      if (dataObj[key1]) {
        ret = ret || timeStamp < todayStart(dataObj[key1]);
      }
      return ret;
    },
    (time: Date) => {
      let ret = false;
      const timeStamp = time.getTime();
      if (dataObj[key1]) {
        ret = ret || timeStamp < todayStart(dataObj[key1]);
      }
      if (dataObj[key2]) {
        ret = ret || timeStamp < todayStart(dataObj[key2]);
      }
      if (dataObj[key4]) {
        ret = ret || timeStamp > todayStart(dataObj[key4]);
      }
      return ret;
    },
    (time: Date) => {
      let ret = false;
      const timeStamp = time.getTime();
      if (dataObj[key1]) {
        ret = ret || timeStamp < todayStart(dataObj[key1]);
      }
      if (dataObj[key2]) {
        ret = ret || timeStamp < todayStart(dataObj[key2]);
      }
      if (dataObj[key3]) {
        return time.getTime() < todayStart(dataObj[key3]);
      }
      return ret;
    }
  ];
}

/*
   限制输入为小数, 需要配合@input使用
   例如：this.receiveData.money = limitInputNumber(value, 2);
*/
export function limitInputNumber(value: string, precision = 2) {
  const newVal = Number(value);
  let retValue = "";
  if (!isNaN(newVal)) {
    // 如果是数字
    const dot_pos = value.indexOf(".");
    if (dot_pos >= 0) {
      // 是小数
      retValue = value.slice(0, dot_pos + (precision + 1)); // 保留precision位小数
    } else {
      retValue = value;
    }
  } else {
    retValue = value.slice(0, value.length - 1);
  }
  return retValue;
}

/* 判断是不是有权限 */
export function checkPermission(permissionStr: string) {
  const permissionArr = permissionStr ? permissionStr.split(",") : [];
  const permission = (LoginModule as any).store.state.Login.permissionList;
  for (const str of permissionArr) {
    if (!permission.includes(str)) {
      return false;
    }
  }
  return true;
}

/* 判断权限都不存在 */
export function checkPermissionNotExist(permissionStr: string) {
  const permissionArr = permissionStr ? permissionStr.split(",") : [];
  const permission = (LoginModule as any).store.state.Login.permissionList;
  for (const str of permissionArr) {
    if (permission.includes(str)) {
      // 存在一个就return false
      // console.log(1111);
      return false;
    }
  }
  return true;
}

/* 判断权限都不存在 */
export function getChannelStr(code: string) {
  const codeArr = code.split(",");
  const map = new Map();
  map.set("0", "Android");
  map.set("1", "IOS");
  map.set("2", "H5");
  map.set("3", "小程序");
  map.set("4", "PC");
  return (
    codeArr
      .sort()
      .map((item: string) => {
        return map.get(item) || "";
      })
      .filter((item: string) => {
        return item !== "";
      })
      .join(",") || "-"
  );
}
