import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeadersBuilderService } from "../headers-builder-service/headers-builder-service";
import { StorageService } from "../storage-service/storage-service";


@Injectable()
export class RestfulService {

  private BASE_ENDPOINT = 'http://localhost:5000';

  constructor(public http: HttpClient) { }

  login(data) {
    let headers = new HeadersBuilderService(
      '',
      'application/x-www-form-urlencoded',
      data.username + ':' + data.password
    );
    return this.http.get(this.BASE_ENDPOINT + "/login",{
      headers: headers.buildLoginHeaders(),
      withCredentials: true
    });
  }

  logout() {
    StorageService.clear();
  }

  getCurrentUser() {
    let headers = new HeadersBuilderService(
      StorageService.readValue('token'),
      '',
      ''
    );
    return this.http.get(this.BASE_ENDPOINT + "/current_user", {
      headers: headers.buildHeaders(),
      withCredentials: true
    });
  }

  getPatients(){
    let headers = new HeadersBuilderService(
      StorageService.readValue('token'),
      '',
      ''
    );
    return this.http.get(this.BASE_ENDPOINT + '/patients', {
      headers: headers.buildHeaders(),
      withCredentials: true
    });
  }

  getDiets(patient_id) {
    let headers = new HeadersBuilderService(
      StorageService.readValue('token'),
      '',
      ''
    );
    return this.http.get(this.BASE_ENDPOINT + '/diets/' + patient_id, {
      headers: headers.buildHeaders(),
      withCredentials: true
    });
  }

  getDishes() {
    let headers = new HeadersBuilderService(
      StorageService.readValue('token'),
      '',
      ''
    );
    return this.http.get(this.BASE_ENDPOINT + '/dishes', {
      headers: headers.buildHeaders(),
      withCredentials: true
    });
  }

  getUsers() {
    let headers = new HeadersBuilderService(
      StorageService.readValue('token'),
      '',
      ''
    );
    return this.http.get(this.BASE_ENDPOINT + '/users', {
      headers: headers.buildHeaders(),
      withCredentials: true
    });
  }

  createDiet(data) {
    let headers = new HeadersBuilderService(
      StorageService.readValue('token'),
      'application/json',
      ''
    );
    return this.http.post(this.BASE_ENDPOINT + '/diets', JSON.stringify(data), {
      headers: headers.buildHeaders(),
      withCredentials: true
    });
  }

  createDish(data) {
    let headers = new HeadersBuilderService(
      StorageService.readValue('token'),
      'application/json',
      ''
    );
    return this.http.post(this.BASE_ENDPOINT + '/dishes', JSON.stringify(data), {
      headers: headers.buildHeaders(),
      withCredentials: true
    });
  }

  createMeasurement(data) {
    let headers = new HeadersBuilderService(
      StorageService.readValue('token'),
      'application/json',
      ''
    );
    return this.http.post(this.BASE_ENDPOINT + '/measurements', JSON.stringify(data), {
      headers: headers.buildHeaders(),
      withCredentials: true
    });
  }

  createUser(data){
    let headers = new HeadersBuilderService(
      StorageService.readValue('token'),
      'application/json',
      ''
    );
    return this.http.post(this.BASE_ENDPOINT + "/users", data, {
      headers: headers.buildHeaders(),
      withCredentials: true
    });
  }

  deleteUser(public_id){
    let headers = new HeadersBuilderService(
      StorageService.readValue('token'),
      '',
      ''
    );
    return this.http.delete(this.BASE_ENDPOINT + "/users/" + public_id, {
      headers: headers.buildHeaders(),
      withCredentials: true
    });
  }

  deleteDiet(diet_id) {
    let headers = new HeadersBuilderService(
      StorageService.readValue('token'),
      '',
      ''
    );
    return this.http.delete(this.BASE_ENDPOINT + '/diets/' + diet_id, {
      headers: headers.buildHeaders(),
      withCredentials: true
    });
  }

  deleteDish(dish_id) {
    let headers = new HeadersBuilderService(
      StorageService.readValue('token'),
      '',
      ''
    );
    return this.http.delete(this.BASE_ENDPOINT + '/dishes/' + dish_id, {
      headers: headers.buildHeaders(),
      withCredentials: true
    });
  }

  updateUser(public_id, data){
    let headers = new HeadersBuilderService(
      StorageService.readValue('token'),
      'application/json',
      ''
    );
    return this.http.put(this.BASE_ENDPOINT + "/users/" + public_id, data, {
      headers: headers.buildHeaders(),
      withCredentials: true
    });
  }

}
