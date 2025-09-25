import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface CreateHttpProps {
  baseURL?: string;
  errorHandling?: boolean;
  timeout?: number;
  onError?: (msg: string) => void;
}

type IAxiosInstance = {
  get: <T = any>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig) => Promise<T>;
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;
  delete: <T = any>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig) => Promise<T>;
  interceptors: AxiosInstance['interceptors'];
  defaults: AxiosInstance['defaults'];
  request: AxiosInstance['request'];
};

export const CreateHttp = (props: CreateHttpProps = {}): IAxiosInstance => {
  const {
    baseURL,
    errorHandling = true,
    timeout = 1000 * 30,
    onError,
  } = props;

  const instance = axios.create({
    baseURL: baseURL || process.env.NEXT_PUBLIC_API_BASE_URL + "/api" || "/api",
    timeout,
  });

  instance.interceptors.request.use(
    (config: any) => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
      }
      config.headers = { ...config.headers, "Content-Type": "application/json", "X-App-Version": "1.0.0" };
      return config;
    },
    error => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const { code, data, message } = response.data;
      if (code === 200) return data ?? response.data;
      if (errorHandling) onError?.(message || "请求失败");
      return Promise.reject(response.data);
    },
    error => {
      let errMsg = "网络错误，请稍后重试";
      const status = error.response?.status;
      if (status === 401) { errMsg = "未授权或登录已过期"; localStorage.removeItem("token"); }
      else if (status === 403) errMsg = "没有权限访问该资源";
      else if (status === 404) errMsg = "接口不存在";
      else if (status === 500) errMsg = "服务器错误";
      if (errorHandling) onError?.(errMsg);
      // return Promise.reject(error);
    }
  );

  return {
    get: <T = any>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> =>
      instance.get(url, { params, ...(config || {}) }),
    post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
      instance.post(url, data, config),
    put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
      instance.put(url, data, config),
    patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
      instance.patch(url, data, config),
    delete: <T = any>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> =>
      instance.delete(url, { params, ...(config || {}) }),
    interceptors: instance.interceptors,
    defaults: instance.defaults,
    request: instance.request,
  };
};

// 默认实例
export const Http = CreateHttp({ onError: msg => console.error("[HttpError]:", msg) });
// 静默实例
export const SilentHttp = CreateHttp({ errorHandling: false });
