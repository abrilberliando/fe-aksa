export interface User {
  id: string;        
  name: string;      
  username: string;
  phone: string;
  email: string;     
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

export interface Admin {
    id: string;
    name: string;
    username: string;
    phone: string;
    email: string;
}

export interface Division {
    id: string;
    name: string;
}

export interface Employee {
    id: string;
    image: string;
    name: string;
    phone: string;
    division: Division;
    position: string;
}

export interface ApiResponse<T> {
    status: 'success' | 'error';
    message: string;
    data: T;
    pagination?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}