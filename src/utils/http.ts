import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface CreateHttpProps {
  baseURL?: string;
  errorHandling?: boolean; // 是否需要统一错误处理
  timeout?: number;
  onError?: (msg: string) => void; // 错误回调（可选）
}

type IAxiosInstance = AxiosInstance & {
  get: (url: string, params?: Record<string, any>, config?: AxiosRequestConfig) => Promise<any>;
  post: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<any>;
  put: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<any>;
  patch: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<any>;
  delete: (url: string, params?: Record<string, any>, config?: AxiosRequestConfig) => Promise<any>;
}

const CreateHttp = (props: CreateHttpProps = {}): IAxiosInstance => {
  const {
    baseURL,
    errorHandling = true,
    timeout = 1000 * 30,
    onError,
  } = props;

  // 创建 axios 实例
  const instance = axios.create({
    baseURL: baseURL || process.env.NEXT_PUBLIC_API_BASE_URL + "/api" || "/api",
    timeout,
  });

  /** 请求拦截 */
  instance.interceptors.request.use(
    (config: any) => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      config.headers = {
        ...config.headers,
        "Content-Type": "application/json",
        "X-App-Version": "1.0.0",
      };

      return config;
    },
    (error: any) => Promise.reject(error)
  );

  /** 响应拦截 */
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const { code, data, msg } = response.data;

      if (code === 200) {
        return data ?? response.data;
      }

      if (errorHandling) {
        onError?.(msg || "请求失败");
      }

      return Promise.reject(response.data);
    },
    (error) => {
      const status = error.response?.status;
      let errMsg = "网络错误，请稍后重试";

      if (status === 401) {
        errMsg = "未授权或登录已过期";
        localStorage.removeItem("token");
      } else if (status === 403) {
        errMsg = "没有权限访问该资源";
      } else if (status === 404) {
        errMsg = "接口不存在";
      } else if (status === 500) {
        errMsg = "服务器错误";
      }

      if (errorHandling) {
        onError?.(errMsg);
      }

      return Promise.reject(error);
    }
  );

  return {
    ...instance,
    get: (url: string, params?: Record<string, any>, config?: AxiosRequestConfig) =>
      instance.get(url, { params, ...(config || {}) }),
    post: (url: string, data?: any, config?: AxiosRequestConfig) =>
      instance.post(url, data, config),
    put: (url: string, data?: any, config?: AxiosRequestConfig) =>
      instance.put(url, data, config),
    patch: (url: string, data?: any, config?: AxiosRequestConfig) =>
      instance.patch(url, data, config),
    delete: (url: string, params?: Record<string, any>, config?: AxiosRequestConfig) =>
      instance.delete(url, { params, ...(config || {}) }),
  } as IAxiosInstance;
};

// 默认实例（带错误提示）
export const Http = CreateHttp({
  onError: (msg) => console.error("[HttpError]:", msg),
});
// 静默实例（不做错误提示）
export const SilentHttp = CreateHttp({
  errorHandling: false,
});
