import * as express from 'express';

declare module 'express' {
  export interface Response {
    setHeader(name: string, value: string | string[]): this;
    send(body?: any): this;
  }
}
