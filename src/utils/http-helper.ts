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

const created = async (data: any): Promise<HttpResponse> => {
  return {
    statusCode: 201,
    body: data
  }
}

const badRequest = async (message?: string): Promise<HttpResponse> => {
  return {
    statusCode: 400,
    body: {
      message: message || "Requisição inválida."
    }
  }
}

const unauthorized = async (message?: string): Promise<HttpResponse> => {
    return {
        statusCode: 401,
        body: {
            message: message || "Não autorizado."
        }
    }
}

const conflict = async (message?: string): Promise<HttpResponse> => {
    return {
        statusCode: 409,
        body: {
            message: message || "Conflito de dados."
        }
    }
}

const internalServerError = async (message?: string): Promise<HttpResponse> => {
  return {
    statusCode: 500,
    body: {
      message: message || "O servidor encontrou uma situação com a qual não sabe lidar."
    }
  }
}

export { OK, noContent, badRequest, created, unauthorized, conflict, internalServerError };
