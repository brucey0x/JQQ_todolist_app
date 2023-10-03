export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          completed: boolean | null
          created_at: string
          id: number
          text: string | null
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          id?: number
          text?: string | null
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          id?: number
          text?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
