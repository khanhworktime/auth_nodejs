export interface ResponseMessage<T> {
    status: boolean;
    message: string;
    data?: T;
}
