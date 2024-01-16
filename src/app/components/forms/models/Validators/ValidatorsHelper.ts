interface ErrorMessage {
  message: string;
}

export function getErrorMessage(value: any, message: string) {
  return !!value ? { message } : null;
}
