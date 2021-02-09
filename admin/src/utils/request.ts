import axios, { AxiosError, AxiosResponse } from "axios";
import to from "await-to-js";
import store from "@/store";
import { HttpResponseCode, HttpResponseBodyType } from "@/utils/types";

const service = axios.create({
  timeout: 15000, // 请求超时时间
  withCredentials: true, // 允许跨域携带cookie
  headers: {
    // 默认配置请求头
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json"
  }
});

// request拦截器
service.interceptors.request.use(
  (config: any) => {
    const token = window.sessionStorage.getItem("token") || "";
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

// response拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (
      response.request.responseType === "arraybuffer" ||
      response.request.responseType === "blob"
    ) {
      return response;
    }
    const resCode = response.data.code;
    if (resCode === HttpResponseCode.NO_LOGIN) {
      // 无登录权限
      setTimeout(() => {
        window.location.href = "/login";
      });
      return Promise.reject("need login");
    } else if (resCode === HttpResponseCode.NO_AUTH) {
      // 权限不足
      return Promise.reject("permission error");
    }
    return response.data;
  },
  (error: AxiosError) => {
    console.log(error);
    let localMessage = "";
    if (error.message.includes("timeout")) {
      console.log("请求超时,接口:", error.config.url);
      localMessage = "请求超时";
    } else if (error.message === "Request failed with status code 404") {
      console.log("请求接口404, 接口:", error.config.url);
      localMessage = "请求接口不存在";
    } else {
      console.log("请求接口发生了错误, 接口:", error.config.url);
      localMessage = "请求接口发生了错误";
    }
    // @ts-ignore
    error.localMessage = localMessage;
    return Promise.reject(error);
  }
);

interface HttpRequestSetting {
  paramType?: "json" | "form" | "file"; // 请求参数类型
  responseType?: "arraybuffer" | "blob"; // 返回参数类型
  proxyType?: "api"; // 代理组的名字
  domain?: string; // domain (有domain 则 proxyType将不生效)
}

/* 非同步的接口 */
export type HttpRequestMethod = (
  path: string,
  params?: object,
  setting?: HttpRequestSetting
) => Promise<HttpResponseBodyType | undefined>;

/* 同步的接口 */
export type HttpRequestMethodAsync = (
  path: string,
  params?: object,
  setting?: HttpRequestSetting
) => Promise<[Error | null, HttpResponseBodyType | undefined]>;

const defaultHttpRequestSetting: HttpRequestSetting = {
  paramType: "form",
  proxyType: "api",
  responseType: undefined
};

function json2Url(data: any) {
  let strData = "";
  Object.keys(data).forEach(item => {
    strData += item + "=" + data[item] + "&";
  });
  if (strData.length > 0) {
    strData = strData.slice(0, strData.length - 1);
  }
  return strData;
}

function urlTrim(path: string) {
  return path.replace(/(\/){2,}/g, "/");
}

function get(
  path: string,
  params = {},
  setting?: HttpRequestSetting
): Promise<HttpResponseBodyType | undefined> {
  const newSetting = { ...defaultHttpRequestSetting, ...setting };
  return service.get(path, {
    // eslint-disable-next-line
        baseURL: newSetting.domain ? newSetting.domain : `\/${newSetting.proxyType}\/`,
    params,
    responseType: newSetting.responseType
  });
}

// @ts-ignore
// @ts-ignore
function post(
  path: string,
  params = {},
  setting?: HttpRequestSetting
): Promise<HttpResponseBodyType | undefined> {
  const newSetting = { ...defaultHttpRequestSetting, ...setting };
  // eslint-disable-next-line
    const url = urlTrim(newSetting.domain ? `${newSetting.domain}/${path}` : `\/${newSetting.proxyType}\/${path}`);
  if (newSetting.paramType === "form") {
    return service.post(url, json2Url(params), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      responseType: newSetting.responseType
    });
  } else if (newSetting.paramType === "file") {
    return service.post(url, params, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }
  return service.post(
    url,
    Object.keys(params).length === 0 ? undefined : params,
    {
      responseType: newSetting.responseType
    }
  );
}

async function getAsync(
  path: string,
  params = {},
  setting?: HttpRequestSetting
): Promise<[Error | null, HttpResponseBodyType | undefined]> {
  return await to<HttpResponseBodyType | undefined>(get(path, params, setting));
}

async function postAsync(
  path: string,
  params = {},
  setting?: HttpRequestSetting
): Promise<[Error | null, HttpResponseBodyType | undefined]> {
  return await to<HttpResponseBodyType | undefined>(
    post(path, params, setting)
  );
}

export default {
  get, // get请求
  post, // post请求
  getAsync, // get请求async版
  postAsync // post请求async版
};
