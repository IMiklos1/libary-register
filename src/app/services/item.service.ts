import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ItemDto } from '../models/item-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  http = inject(HttpClient);

  getAll() {
    return this.http.get<ItemDto[]>('/api/item');    
  }

  getOne(id: number) {
    return this.http.get<ItemDto>('/api/item/' + id);    
  }

  create(item: ItemDto) {
    return this.http.post<ItemDto>('/api/item', item);
  }

  update(item: ItemDto) {
    return this.http.put<ItemDto>('/api/item', item);
  }

  delete(id: number) {
    return this.http.delete('/api/item/' + id); 
  }
}
