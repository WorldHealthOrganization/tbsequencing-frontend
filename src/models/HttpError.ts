interface HttpErrorData {
  errors: IError[]
}

export interface IError {
  attr: string;
  detail: string;
  code: string
}

export interface IHttpError {
  data: HttpErrorData
  status: number
}
