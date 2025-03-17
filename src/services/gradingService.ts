import { postRequest } from '../shared/httpService';
import type { GradingRequest, GradingResponse, ScanBranchResponse } from '../model/grading';

// Submit Grading Request
export const submitGradingRequest = async (data: GradingRequest): Promise<GradingResponse> => {
  return postRequest<GradingResponse>('/java/grade-code', data);
};

// Scan Repository untuk mendapatkan daftar branches
export const scanRepositoryBranches = async (repositoryUrl: string): Promise<ScanBranchResponse> => {
  return postRequest<ScanBranchResponse>('/gitlab/scan-branches', { repository_url: repositoryUrl });
};
