import { ErrorOption, Path } from 'react-hook-form';
import { IHttpError } from '../../../models/HttpError';

interface ITransformedError {
  message: ErrorOption['message'];
  type: ErrorOption['type'];
  name: Path<any>
}

export const formatErrors = (httpError?: IHttpError): ITransformedError[] | undefined => {
  if (!httpError?.data?.errors) return undefined;
  const { data: { errors } } = httpError;
  return errors.map((e) => ({
    type: 'custom',
    name: e.attr,
    message: e.detail,
  }));
};
