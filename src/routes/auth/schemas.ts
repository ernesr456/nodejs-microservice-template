export interface IUserLoginRequestBody {
  username: string;
  password: string;
}
export interface IUserLoginResponseSuccessful {
  accessToken: string;
}
export interface IUserLoginResponseError {
  status: number;
  message: string;
}

export interface IUserRegisterRequestBody {
  username: string;
  password: string;
  confirmPassword: string;
}
export interface IUserRegisterResponseSucessful {}
export interface IUserRegisterResponseError {
  status: number;
  message: string;
}

export interface IUserSessionRequestBody {
  walletId: string;
}
export interface IUserSessionResponseSuccessful {
  sessionId: string;
}
export interface IUserSessionResponseError {
  status: number;
  message: string;
}
