import { Movement } from './movement.model';

const MOVEMENT_CORE_FIELDS = `
            id
            description
            amount
            type
            category
            date
`;

const MOVEMENT_ITEM_FIELDS = `
            items {
                id
                name
                price
                subcategory
                position
            }
`;

export function movementFields(includeItems: boolean): string {
    return includeItems
        ? `${MOVEMENT_CORE_FIELDS}${MOVEMENT_ITEM_FIELDS}`
        : MOVEMENT_CORE_FIELDS;
}

/* FIND */
export const MOVEMENTS_QUERY = `
    query Movements {
        movements {
            ${movementFields(true)}
        }
    }
`;

export function movementsFilteredQuery(includeItems: boolean): string {
    return `
    query ($filter: MovementFilterInput!) {
        movements(filter: $filter) {
            ${movementFields(includeItems)}
        }
    }
`;
}

export interface MovementsGqlResponse {
    movements: Movement[];
}

export const MOVEMENT_QUERY = `
    query($id: Int!) {
        movement(id: $id) {
            ${movementFields(true)}
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
            ${movementFields(true)}
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
            ${movementFields(true)}
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