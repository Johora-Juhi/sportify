/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";

type data<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  token?: string;
  data: T;
};
const SendResponse = <T>(res: Response, data: data<T>) => {
  // res.status(data.statusCode).json({
  //   success: data.success,
  //   message: data.message,
  //   data: data.data,
  // });
  const response: Record<string, any> = {
    success: data.success,
    message: data.message,
  };

  if (data.token) {
    response.token = data.token;
  }

  response.data = data.data;

  res.status(data.statusCode).json(response);
};

export default SendResponse;
