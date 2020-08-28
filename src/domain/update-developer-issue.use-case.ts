import { Service } from 'typedi';
import { DeveloperDataSource } from '@data/db';

@Service()
export class UpdateDeveloperIssueUseCase {
  constructor(private readonly dataSource: DeveloperDataSource) {}

  execute(developerId: number, issueId: number): Promise<boolean> {
    return this.dataSource.update(developerId, { issueId });
  }
}
