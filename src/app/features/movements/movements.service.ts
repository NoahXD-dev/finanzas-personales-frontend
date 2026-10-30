import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { GraphqlClient } from '../../core/graphql/graphql.client';
import { CreateMovementInput, Movement } from './movement.model';
import {
  MovementsGqlResponse, MOVEMENT_QUERY_FILTERED,
  MovementGqlResponse, MOVEMENT_QUERY,
  CreateMovementGqlResponse, CREATE_MOVEMENT_MUTATION,
  UpdateMovementGqlResponse, UPDATE_MOVEMENT_MUTATION,
  MovementsByMonthGqlResponse, MOVEMENTS_MONTHLY_QUERY,
  MovementsByCategoryGqlResponse, MOVEMENTS_CATEGORIES_QUERY,
  MovementSummaryGqlResponse, SUM_MOVEMENTS_QUERY,
} from './movements.interface';

@Injectable({ providedIn: 'root' })
export class MovementsService {
  private readonly graphql = inject(GraphqlClient);

  /**
   * Find movements in a date range (inclusive).
   * @param from - The start date
   * @param to - The end date
   * @returns Observable<Movement[]>
   */
  findAll(from: string, to: string): Observable<Movement[]> {
    return this.graphql
      .query<MovementsGqlResponse>(MOVEMENT_QUERY_FILTERED, {
        filter: { fromDate: from, toDate: to },
      })
      .pipe(map((data) => data.movements as Movement[]));
  }

  /**
   * Find a movement by id
   * @param id - The id of the movement
   * @returns Observable<Movement>
   */
  findById(id: number): Observable<Movement> {
    return this.graphql
    .query<MovementGqlResponse>(MOVEMENT_QUERY, { id })
    .pipe(map((data) => data.movement as Movement));
  }

  /**
   * Create a new movement
   * @param movement - The movement to create
   * @returns Observable<Movement>
   */
  create(input: CreateMovementInput): Observable<Movement> {
    return this.graphql
      .mutate<CreateMovementGqlResponse>(CREATE_MOVEMENT_MUTATION, { input })
      .pipe(map((data) => data.createMovement as Movement));
  }

  /**
   * Update a movement
   * @param id - The id of the movement
   * @param movement - The movement to update
   * @returns Observable<Movement>
   */
  update(id: number, movement: Movement): Observable<Movement> {
    return this.graphql
      .mutate<UpdateMovementGqlResponse>(UPDATE_MOVEMENT_MUTATION, { 
        id,
        input: movement as Movement,
      })
      .pipe(map((data) => data.updateMovement as Movement));
  }

  /**
   * Get movements by month
   * @param from - The start date
   * @param to - The end date
   * @returns Observable{ month: string; totalIncome: number; totalExpense: number; }[]>
   */
  getMovementsByMonth(from: string, to: string): Observable<{ month: string; totalIncome: number; totalExpense: number; }[]> {
    return this.graphql
      .query<MovementsByMonthGqlResponse>(MOVEMENTS_MONTHLY_QUERY, { from, to })
      .pipe(map((data) => data.movementsByMonth as { month: string; totalIncome: number; totalExpense: number; }[]));
  }

  /**
   * Get movements by category
   * @param from - The start date
   * @param to - The end date
   * @returns Observable{ category: string; totalIncome: number; totalExpense: number; }[]>
   */
  getMovementsByCategory(from: string, to: string): Observable<{ category: string; totalIncome: number; totalExpense: number; }[]> {
    return this.graphql
      .query<MovementsByCategoryGqlResponse>(MOVEMENTS_CATEGORIES_QUERY, { from, to })
      .pipe(map((data) => data.movementsByCategory as { category: string; totalIncome: number; totalExpense: number; }[]));
  }

  /**
   * Get movement summary
   * @param from - The start date
   * @param to - The end date
   * @returns Observable<{ totalIncome: number; totalExpense: number; balance: number; }>
   */
  getMovementSummary(from: string, to: string): Observable<{ totalIncome: number; totalExpense: number; balance: number; }> {
    return this.graphql
      .query<MovementSummaryGqlResponse>(SUM_MOVEMENTS_QUERY, { from, to })
      .pipe(map((data) => data.movementSummary as { totalIncome: number; totalExpense: number; balance: number; }));
  }
}
