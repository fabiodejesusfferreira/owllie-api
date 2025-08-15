import { HttpResponse } from "../models/http-response-model";

const OK = async (data: any): Promise<HttpResponse> => {
  return {
    statusCode: 200,
    body: data,
  };
};

const noContent = async (): Promise<HttpResponse> => {
  return {
    statusCode: 204,
    body: null,
  };
};

const created = async (): Promise<HttpResponse> => {
  return {
    statusCode: 201,
    body: {
      message: "Successful"
    }
  }
}

const badRequest = async (): Promise<HttpResponse> => {
  return {
    statusCode: 400,
    body: null
  }
}

export { OK, noContent, badRequest, created };
