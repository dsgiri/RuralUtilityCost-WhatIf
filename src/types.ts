export type Category = 
  | 'Cost scenarios'
  | 'Price scenarios'
  | 'Yield scenarios'
  | 'Livestock scenarios'
  | 'Input rate scenarios'
  | 'Risk comparison scenarios';

export interface ToolItem {
  id: string;
  title: string;
  description: string;
  category: Category;
  route: string;
  keyVariable: string;
  featured: boolean;
  newest: boolean;
}
