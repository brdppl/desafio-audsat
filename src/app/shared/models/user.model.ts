import { IAddress } from "./address.model";
import { ICompany } from "./companty.model";

export interface IUser {
  address: IAddress;
  company: ICompany;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}