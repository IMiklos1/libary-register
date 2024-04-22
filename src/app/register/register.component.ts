import { Component, OnInit } from '@angular/core';
import { ItemDto } from '../models/item-dto.model';
import { UserDto } from '../models/user-dto.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ItemWithRenterDto } from '../models/items-with-renter.model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RegisterService } from '../services/register.service';
import { UserService } from '../services/user.service';
import { ItemService } from '../services/item.service';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    MatSelectModule,
    AsyncPipe,
    MatAutocompleteModule,
  MatOption],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'number',
    'type',
    'author',
    'title',
    'procurementDate',
    'renterName', // Added column for renter's name
    'address',
    'phone',
    'idCard',
    'renterStatus'
  ];
  dataSource: MatTableDataSource<ItemWithRenterDto>;

  users: UserDto[];
  items: ItemDto[];
  itemsWithRenter: ItemWithRenterDto[];

  selectedUser: UserDto | null = null;
  userSearchControl = new FormControl();
  addRentingUser: UserDto[];
  filteredUsers: Observable<UserDto[]>;
  selectedItem: ItemDto | null = null;
  itemSearchControl = new FormControl();
  addRentedItem: ItemDto[];
  filteredItems: Observable<ItemDto[]>;
  router: any;


  constructor(private registerService: RegisterService, private userService: UserService, private itemService: ItemService) {
    this.users = [];
    this.items = [];
    this.getUsers();
    this.getItems();
    this.itemsWithRenter = [];
    this.dataSource = new MatTableDataSource<ItemWithRenterDto>([]);
    // this.selectedUser = this.users[0];
    // this.selectedItem = this.items[0];
    this.addRentingUser = [];
    this.addRentedItem = [];

    this.filteredUsers = this.userSearchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._userFilter(value))
    );

    this.filteredItems = this.itemSearchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._itemFilter(value))
    );
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private _userFilter(value: string | null): UserDto[] {
    const filterValue = (value || '').toLowerCase(); // Handle null or undefined
    return this.addRentingUser.filter(user =>
      user.name.toLowerCase().includes(filterValue) ||
      user.address.toLowerCase().includes(filterValue) ||
      user.idCard.toLowerCase().includes(filterValue)
    );
  }

  private _itemFilter(value: string | null): ItemDto[] {
    const filterValue = (value || '').toLowerCase(); // Handle null or undefined
    return this.addRentedItem.filter(item =>
      item.title.toLowerCase().includes(filterValue) ||
      item.author.toLowerCase().includes(filterValue) ||
      item.type.toLowerCase().includes(filterValue)
    );
  }

  displayFnUser(user: UserDto): string {
    return user && user.name ? user.name : '';
  }
  displayFnItem(item: ItemDto): string {
    return item && item.title ? item.title : '';
  }

  compareItems(item1: ItemDto, item2: ItemDto): boolean {
    // Compare items by their IDs
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }

  getUsers(): void {
    this.userService.getAll()
      .subscribe(
        (data) => {
          this.users = data;
          this.fetchData();
          this.addRentingUser = this.users.filter(u => u.status === "active");
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getItems(): void {
    this.itemService.getAll()
      .subscribe(
        (data) => {
          this.items = data;
          this.addRentedItem = this.items.filter(i => i.status.toLowerCase() === "free")
          this.fetchData();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  fetchData(): void {
    if (!this.items || !this.users) {
      return;
    }
    this.itemsWithRenter = this.items
      .filter(item => item.renterId > 0)
      .map(item => {
        const renter = this.users.find(user => +user.id === +item.renterId) || null;

        const itemWithRenter: ItemWithRenterDto = {
          ...item,
          renter: renter ? { ...renter } : null
        };

        return itemWithRenter;
      });

    this.dataSource.data = this.itemsWithRenter;
  }

  addNewRent() {
    let updateItem: ItemDto = this.itemSearchControl.value;
    updateItem.renterId = this.userSearchControl.value.id;
    updateItem.startRent = new Date();
    updateItem.status = "reserved";
    if(this.itemSearchControl && this.userSearchControl){
      console.log(updateItem);
      this.itemService.update(updateItem).subscribe();
      this.fetchData();
    }
  }
}
