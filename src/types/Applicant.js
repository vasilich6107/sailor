// @flow

import type { Data } from './Data';

type ApplicantName = {
  first: string,
  last: string,
  title: string,
};

type ApplicantLogin = {
  uuid: string,
};

type ApplicantPicture = {
  medium: string,
};

type ApplicantLocation = {
  city: string,
};

export type Applicant = {
  name: ApplicantName,
  location: ApplicantLocation,
  picture: ApplicantPicture,
  login: ApplicantLogin,
  state: string,
};

export type ApplicantData = Data<Applicant>;
