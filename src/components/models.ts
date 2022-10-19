export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface dailyContributions {
  date: string;
  contributions: string[];
}
