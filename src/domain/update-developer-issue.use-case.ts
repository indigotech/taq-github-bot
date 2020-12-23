import Container, { Service } from 'typedi';
import { DeveloperDataSource } from '@data/db';

@Service()
export class UpdateDeveloperIssueUseCase {
  private readonly dataSource = Container.get(DeveloperDataSource);

  execute(developerId: number, issueId: number): Promise<boolean> {
    return this.dataSource.update(developerId, { issueId });
  }
}
