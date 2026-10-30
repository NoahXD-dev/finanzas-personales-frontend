export type MovementType = 'income' | 'expense';

export interface Movement {
  id: string;
  description: string;
  amount: number;
  type: string;
  category: string;
  date: string;
}

export interface CreateMovementInput {
  description: string;
  amount: number;
  type: MovementType;
  category: string;
  date: string;
}
