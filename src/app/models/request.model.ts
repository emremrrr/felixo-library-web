import { BookModel } from './book.model';

export class RequestModel
{
  Id: string;
  BeginDate: Date;
  EndDate: Date;
  IsApproved: boolean;
  Book?: BookModel;
  ApplicationUser?: any;
}
