export interface GradingQuestion {
    question: string;    
    review: string;
  }
  
export interface GradingResponse {
    data: GradingQuestion[];    
}
  
export interface GradingRequest {
    repository_url : string;
    branch: string;
    questions: string[];
}

export interface ScanBranchResponse {
    data: string[];
    message: string;
  }
  