import { Modify, Nullable } from '../../models/tsHelpers';

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IRegistrationRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password1: string;
  password2: string;
  institutionName: string;
  institutionCountry: string;
  institutionHeadName: string;
  institutionHeadEmail: string;
  institutionPhone: string;
}

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  profile: IUserProfile;
}

export interface IVerifyEmailRequest {
  key: string;
}

export interface IRegistrationResponse {
  detail: string;
}

export interface IResetPasswordConfirmRequest {
  newPassword1: string;
  newPassword2: string;
  uid: string;
  token: string;
}

export interface IResetPasswordRequest {
  email: string;
}

export type VerificationState = 'NOT_VERIFIED' | 'PENDING_VERIFICATION' | 'VERIFIED';

export interface IProfileCountry {
  countryId: number
  countryOfficialName: Nullable<string>
  countryUsualName: string;
  threeLettersCode: string;
  twoLettersCode: string;
}

export interface IRefreshTokenResult {
  access: string;
  accessTokenExpiration: string;
}

export interface IChangePasswordRequest {
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
}

export interface IUserProfile {
  institutionCountry: IProfileCountry;
  institutionHeadEmail: string;
  institutionHeadName: string;
  institutionName: string;
  institutionPhone: string;
  verificationState: VerificationState;
}

export type ModifiedUserProfile = Modify<IUserProfile, {
  institutionCountry: string;
  verificationState: undefined;
}>;

export type UserRequestProfile = Omit<ModifiedUserProfile, 'verificationState'>;

export interface IChangeUserInfoRequest {
  username?: string;
  firstName: string;
  lastName: string;
  profile: UserRequestProfile;
}
