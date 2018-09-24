// @flow
import type { Applicant } from './Applicant';

export type DashboardFilter = {|
  name: string,
  city: string,
|}

export type DashboardColumns = Array<string>;

export type DashboardApplicants = { [key: string]: Applicant };
