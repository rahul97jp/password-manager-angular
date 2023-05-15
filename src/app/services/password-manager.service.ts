import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private _http: HttpClient) { }

  getAllPasswords(): Observable<any> {
    return this._http.get('http://localhost:3000/passwords');
  }

  getPasswordById(id: number): Observable<any> {
    return this._http.get<any>(`http://localhost:3000/passwords/${id}`);
  }

  addPassword(data: any): Observable<any> {
    data.encryptedPassword = btoa(data.encryptedPassword);
    return this._http.post('http://localhost:3000/passwords', data);
  }

  updatePassword(id: number, data: any): Observable<any> {
    data.encryptedPassword = btoa(data.encryptedPassword);
    return this._http.put(`http://localhost:3000/passwords/${id}`, data);
  }

  deleteAccount(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/passwords/${id}`);
  }
}
