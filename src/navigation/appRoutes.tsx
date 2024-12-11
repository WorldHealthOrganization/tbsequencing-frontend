import React, { ReactElement } from 'react';
import { ResetPassword } from '../features/auth/components/resetPassword/ResetPassword';
import { ResetPasswordConfirm } from '../features/auth/components/resetPasswordConfirm/ResetPasswordConfirm';
import { VerifyEmail } from '../features/auth/components/verifyEmail/VerifyEmail';
import WorldMap from '../features/worldmap/components/WorldMap';
import DrugsView from '../features/drugsView';
import DownloadView from '../features/downloadView';
import MutationView from '../features/MutationView/components/MutationView/MutationView';
import SubmissionPackageList from '../features/dataSubmission/components/SubmissionPackageList';
import PackagePage from '../features/dataSubmission/components/PackagePage';
import { Registration } from '../features/auth/components/registration/Registration';
import RegistrationResult from '../components/RegistrationResult';
import TermsOfUse from '../components/TermsOfUse';
import PackageSending from '../features/dataSubmission/components/PackageSending';
import GenesView from '../features/genesView/components/GenesView';
import EmailWasSent from '../components/EmailWasSent';
import UserInfo from '../features/auth/components/UserInfo';
import ThrowTestError from '../components/ThrowTestError';
import AboutUs from '../components/AboutUs';

export interface IAppRoute {
  path: string;
  element: ReactElement
}

export const appRoutes = {
  resetPassword: {
    path: '/password/reset',
    element: <ResetPassword />,
  },
  resetPasswordConfirm: {
    path: '/password/reset/confirm/*',
    element: <ResetPasswordConfirm />,
  },
  verifyEmail: {
    path: '/email/confirm/*',
    element: <VerifyEmail />,
  },
  overview: {
    path: '/overview',
    element: <WorldMap />,
  },
  drugs: {
    path: '/drugs',
    element: <DrugsView />,
  },
  download: {
    path: '/download',
    element: <DownloadView />,
  },
  genes: {
    path: '/genes',
    element: <GenesView />,
  },
  registration: {
    path: '/terms-and-conditions',
    element: <Registration />,
  },
  mutations: {
    path: '/mutations',
    element: <MutationView />,
  },
  dataSubmission: {
    path: '/data-submission',
    element: <SubmissionPackageList />,
  },
  package: {
    path: '/data-submission/*',
    element: <PackagePage />,
  },
  packageSend: {
    path: '/data-submission/send/*',
    element: <PackageSending />,
  },
  registrationSuccess: {
    path: '/registration-success',
    element: <RegistrationResult />,
  },
  termsOfUse: {
    path: '/terms-of-use',
    element: <TermsOfUse />,
  },
  emailWasSent: {
    path: '/reset-email-sent',
    element: <EmailWasSent />,
  },
  userInfo: {
    path: '/account-settings',
    element: <UserInfo />,
  },
  throwTestError: {
    path: '/throw-test-error',
    element: <ThrowTestError />,
  },
  about: {
    path: '/about',
    element: <AboutUs />,
  },
};

export const appRoutesArray: IAppRoute[] = Object.values(appRoutes);
