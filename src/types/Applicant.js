// @flow

import type { Data } from './Data';

type ApplicantNameType = {
  first: string,
  last: string,
  title: string,
};

type ApplicantLoginType = {
  uuid: string,
};

type ApplicantPictureType = {
  medium: string,
};

type ApplicantLocationType = {
  city: string,
};

export type ApplicantType = {
  name: ApplicantNameType,
  location: ApplicantLocationType,
  picture: ApplicantPictureType,
  login: ApplicantLoginType,
  state: string,
};

export type ApplicantDataType = Data<ApplicantType>;
