export interface GradingQuestion {
    question: string;
    result: 'Lulus' | 'Gagal';
    reason: string;
  }
  
export interface GradingResponse {
    details: GradingQuestion[];
    grade: number;
}
  
export interface GradingRequest {
    branch: string;
    questions: string[];
}