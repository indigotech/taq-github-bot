import { Service } from 'typedi';
import { DeveloperDataSource } from '@data/db';

export interface CommentInfo {
  developerId: number;
  issueId: number;
  comment: string;
}

@Service()
export class ShouldIncrementDevProgressUseCase {
  constructor(private readonly dataSource: DeveloperDataSource) { }

  async execute(commentInfo: CommentInfo): Promise<boolean> {
    const isFinishComment = commentInfo.comment.match(/finish|next*/i);
    const developer = await this.dataSource.get(commentInfo.developerId);
    const isCorrectIssue = developer.issueId === commentInfo.issueId;

    return isFinishComment && isCorrectIssue;
  }
}
