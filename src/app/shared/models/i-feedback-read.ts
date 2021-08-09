import { IUser } from './i-user';

export interface IFeedbackRead {
  feedbackId: number;
  question: string;
  assignee: IUser[];
}
