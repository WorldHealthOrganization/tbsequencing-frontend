import { Path, UseFormSetError } from 'react-hook-form';
import { useEffect } from 'react';
import { IHttpError } from '../models/HttpError';
import { formatErrors } from '../components/FormFields/utils/formatErrors';

export const prepareFlatErrors = (changeInfoError: IHttpError, fallbackAttr?:string) => {
  if (!changeInfoError?.data?.errors) {
    return undefined;
  }
  return {
    ...changeInfoError,
    data: {
      ...changeInfoError.data,
      errors: changeInfoError.data.errors.map((e) => ({
        ...e,
        attr: e.attr ? e.attr.split('.').at(-1)! : `${fallbackAttr}`,
      })),
    },
  };
};

export const useHttpError = <T>(httpError: IHttpError,
  setError: UseFormSetError<T>,
  fallbackField?: string,
) => {
  useEffect(() => {
    if (httpError) {
      /*
      TODO: handle nested form fields
      There will be an edge case if form has nested fields
      example: {fileName: "foo.bar", link: {fileName: "bar.foo"}}
      in such case there will two error objects with same name
      [
        {
          name: fileName,
          message: foo.bar
        },
        {
          name: fileName,
          message: bar.foo
      ]
       */
      const flatErrors = prepareFlatErrors(httpError, fallbackField);
      const httpErrors = formatErrors(flatErrors);
      httpErrors?.forEach(({ name, type, message }) => {
        setError(name as Path<T>, { type, message });
      });
    }
  }, [httpError]);
};
