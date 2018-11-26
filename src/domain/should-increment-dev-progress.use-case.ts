import { Service } from 'typedi';
import { DeveloperDataSource } from '@data/db';

@Service()
export class ShouldIncrementDevProgressUseCase {
  constructor(private readonly dataSource: DeveloperDataSource) { }

  async execute(developerId: number, issueId: number, comment: string): Promise<boolean> {
    const isFinishComment = comment.match(/finish|next*/i);
    const developer = await this.dataSource.get(developerId);
    const isCorrectIssue = developer.issueId === issueId;

    return Promise.resolve(isFinishComment && isCorrectIssue);
  }
}
