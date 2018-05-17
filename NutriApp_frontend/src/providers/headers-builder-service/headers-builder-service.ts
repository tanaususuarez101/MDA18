import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class HeadersBuilderService {

  header_token: string;
  header_contentType: string;
  header_authorization: string;

  constructor(header_token: string = '', header_contentType: string = '', header_authorization: string = '') {
    this.header_token = header_token;
    this.header_contentType = header_contentType;
    this.header_authorization = header_authorization;
  }

  public buildLoginHeaders(){
    return new HttpHeaders({
      'Content-Type' : this.header_contentType,
      'Authorization': 'Basic '+ btoa(this.header_authorization)
    });
  }

  public buildHeaders(){
    return new HttpHeaders({
      'Content-Type': this.header_contentType,
      'x-access-token': this.header_token
    });
  }
}
