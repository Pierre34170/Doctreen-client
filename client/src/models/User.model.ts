import { User_Interface } from '../interfaces/User.interface';

export class User implements User_Interface {
  user_id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  description: string;
  nb_like: number;
  signal: number;
  role: string;

  constructor(
    user_id: number,
    first_name: string,
    last_name: string,
    email_address: string,
    description: string,
    nb_like: number,
    signal: number,
    role: string,
  ) {
    this.user_id = user_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email_address = email_address;
    this.description = description;
    this.nb_like = nb_like;
    this.signal = signal;
    this.role = role;
  }
}
