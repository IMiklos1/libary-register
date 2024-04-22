import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserDto } from '../models/user-dto.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  http = inject(HttpClient);
  
  constructor() {}

  getAll() {
    return this.http.get<UserDto[]>('/api/user');    
  }

  getOne(id: number) {
    return this.http.get<UserDto>('/api/user/' + id);    
  }

  create(user: UserDto) {
    return this.http.post<UserDto>('/api/user', user);
  }

  update(user: UserDto) {
    return this.http.put<UserDto>('/api/user', user);
  }

  delete(id: number) {
    return this.http.delete('/api/user/' + id); 
  }
}
