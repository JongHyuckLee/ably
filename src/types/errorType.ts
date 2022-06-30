export interface ErrorType {
  response: {
    data: {
      error: {
        message: string;
      };
    };
  };
  message: string;
}
