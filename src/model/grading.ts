export interface GradingQuestion {
    question: string;
    result: 'Lulus' | 'Gagal';
    review: string;
  }
  
export interface GradingResponse {
    details: GradingQuestion[];
    grade: number;
}
  
export interface GradingRequest {
    repository_url : string;
    branch: string;
    questions: string[];
}