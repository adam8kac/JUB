export interface UserRegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
}
