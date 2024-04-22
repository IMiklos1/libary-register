import { User } from '../entity/User';
import { Transform, Type } from 'class-transformer';

export class ItemWithRenterDto {
  id: number;
  number: string;
  type: string;
  author: string;
  title: string;
  procurementDate: Date;
  status: string;

  @Type(() => User)
  @Transform(value => value ? new User(value.value) : null, { toClassOnly: true })
  renter: User | null;

  startRent: Date;

  constructor(partial: Partial<ItemWithRenterDto>) {
    Object.assign(this, partial);
  }
}
