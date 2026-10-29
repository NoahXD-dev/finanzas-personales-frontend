import { Movement } from './movement.model';

/* FIND */
export const MOVEMENTS_QUERY = `
    query Movements {
        movements {
            id
            description
            amount
            type
            category
            date
        }
    }
`;

export const MOVEMENT_QUERY_FILTERED = `
    query ($filter: MovementFilterInput!) {
        movements(filter: $filter) {
            id
            description
            amount
            type
            category
            date
        }
    }
`;

export interface MovementsGqlResponse {
    movements: Movement[];
}

export const MOVEMENT_QUERY = `
    query($id: Int!) {
        movement(id: $id) {
            id
            description
            amount
            type
            category
            date
        }
    }
`;

export interface MovementGqlResponse {
    movement: Movement;
}

/* CREATE */
export const CREATE_MOVEMENT_MUTATION = `
    mutation ($input: CreateMovementInput!) {
        createMovement(input: $input) {
            id
            description
            amount
            type
            category
            date
        }
    }
`;

export interface CreateMovementGqlResponse {
    createMovement: Movement;
}

/* UPDATE */
export const UPDATE_MOVEMENT_MUTATION = `
    mutation($id: Int!, $input: UpdateMovementInput!) {
        updateMovement(id: $id, input: $input) {
            id
            description
            amount
            type
            category
            date
        }
    }
`;

export interface UpdateMovementGqlResponse {
    updateMovement: Movement;
}

/* MONTHLY */
export const MOVEMENTS_MONTHLY_QUERY = `
    query ($from: String, $to: String) {
        movementsByMonth(fromDate: $from, toDate: $to) {
            month
            totalIncome
            totalExpense
        }
    }
`;

export interface MovementsByMonthGqlResponse {
    movementsByMonth: {
        month: string;
        totalIncome: number;
        totalExpense: number;
    }[];
}

/* CATEGORIES */
export const MOVEMENTS_CATEGORIES_QUERY = `
    query ($from: String, $to: String) {
        movementsByCategory(fromDate: $from, toDate: $to) {
            category
            totalIncome
            totalExpense
        }
    }
`;

export interface MovementsByCategoryGqlResponse {
    movementsByCategory: {
        category: string;
        totalIncome: number;
        totalExpense: number;
    }[];
}

/* SUMMARY */
export const SUM_MOVEMENTS_QUERY = `
    query ($from: String!, $to: String!) {
        movementSummary(fromDate: $from, toDate: $to) {
            totalIncome
            totalExpense
            balance
        }
    }
`;

export interface MovementSummaryGqlResponse {
    movementSummary: {
        totalIncome: number;
        totalExpense: number;
        balance: number;
    };
}