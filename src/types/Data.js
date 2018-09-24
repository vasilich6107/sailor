// @flow

export type Data<T> = {|
  loading: boolean,
  data: { [uuid: string]: T },
  error: ?{
    message: string,
  },
|};
