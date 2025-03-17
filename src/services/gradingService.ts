import { postRequest } from '../shared/httpService';
import type { GradingRequest, GradingResponse } from '../model/grading';

export const submitGradingRequest = async (data: GradingRequest): Promise<GradingResponse> => {
  return postRequest<GradingResponse>('/java/grade-code', data);
};