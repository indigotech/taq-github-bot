import { Service } from 'typedi';
import { DeveloperDataSource } from '@data/db';

@Service()
export class UpdateDeveloperIssueUseCase {
  constructor(private readonly dataSource: DeveloperDataSource) { }

  async execute(developerId: number, issueId: number): Promise<boolean> {
    const success = await this.dataSource.update(developerId, { issueId });

    return Promise.resolve(success);
  }
}
