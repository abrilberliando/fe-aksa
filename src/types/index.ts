export interface User {
  username: string;
  fullName: string;
}

export interface DataItem {
  id: string;
  name: string;
  role: string;
  email: string;
}

// Untuk filter/pagination state
export interface TableParams {
  page: number;
  search: string;
}