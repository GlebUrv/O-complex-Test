import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { AUTH_API_ROUTES } from "../enums/authApiRoutes";

// Расширение InternalAxiosRequestConfig для добавления свойства sent
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  sent?: boolean;
}

// Создание экземпляра axios с базовой конфигурацией + получение URL из .env
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API}`,
  withCredentials: false,
});

// Глобальная переменнная для хранения токена доступа
let accessToken: string = localStorage.getItem("accessToken") || "";

// Функция установки токена доступа
export function setAccessToken(token: string): void {
  accessToken = token;
  localStorage.setItem("accessToken", token);
}

// Интерсептор для обработки запросов (добавление HTTP заголовка)
axiosInstance.interceptors.request.use(
  (config: ExtendedAxiosRequestConfig): ExtendedAxiosRequestConfig => {
    if (config.headers && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  }
);

// Интерсептор для обработки ответов и ошибок
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError) => {
    //  Хранение информации о предыдущем запросе
    const prevRequest: ExtendedAxiosRequestConfig | undefined = error.config;

    // Проверка статуса ответа и метки предыдущего запроса
    if (error.response?.status === 403 && prevRequest && !prevRequest.sent) {
      try {
        // Делаем запрос для обновления пары токенов
        const response = await axiosInstance.get(
          AUTH_API_ROUTES.REFRESH_TOKENS
        );

        // Получаем новый токен из ответа
        accessToken = response.data.data.accessToken;
        localStorage.setItem("accessToken", accessToken);

        // Устанавливаем метку повторного запроса
        prevRequest.sent = true;

        if (prevRequest.headers) {
          prevRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        // Повторная отправка запроса
        return axiosInstance(prevRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
