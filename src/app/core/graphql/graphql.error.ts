export class GraphqlClientError extends Error {
  readonly codes: string[];

  constructor(message: string, codes: string[] = []) {
    super(message);
    this.name = 'GraphqlClientError';
    this.codes = codes;
  }

  hasCode(code: string): boolean {
    return this.codes.includes(code);
  }
}
