import { CategoryModel } from './category.model';

export class BookModel
{
  Id: string;
  Name: string;
  Category?: CategoryModel;
}
