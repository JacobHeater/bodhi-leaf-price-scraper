export interface IArrayReporter<T> {
  generateReport(items: T[]): string;
}

export interface IReporter<T> {
  generateReport(item: T, ignoreKeys?: string[]): string;
}
