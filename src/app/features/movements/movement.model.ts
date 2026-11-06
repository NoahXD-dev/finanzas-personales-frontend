export type MovementType = 'income' | 'expense';

export interface MovementItem {
  id: string;
  name: string;
  price: number;
  subcategory: string;
  position: number;
}

export interface MovementItemInput {
  name: string;
  price: number;
  subcategory: string;
}

export interface Movement {
  id: string;
  description: string;
  amount: number;
  type: string;
  category: string;
  date: string;
  items?: MovementItem[];
}

export interface CreateMovementInput {
  description: string;
  amount: number;
  type: MovementType;
  category: string;
  date: string;
  items?: MovementItemInput[];
}

export interface MovementFilter {
  fromDate?: string;
  toDate?: string;
  type?: MovementType;
  category?: string;
}
