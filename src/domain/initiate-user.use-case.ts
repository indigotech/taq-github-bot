import Container, { Service } from 'typedi';
import { DeveloperDataSource } from '@data/db';
import { Developer, DeveloperInput } from './developer.model';

export interface InitiateUser {
  developer: Developer;
  alreadyExists: boolean;
}

@Service()
export class InitiateUserUseCase {
  private readonly dataSource = Container.get(DeveloperDataSource);

  async execute(input: DeveloperInput): Promise<InitiateUser> {
    let developer = await this.dataSource.get(input.developerId);

    if (developer) {
      return { developer, alreadyExists: true };
    }

    developer = await this.createNewUser(input);
    return { developer, alreadyExists: false };
  }

  private async createNewUser(input: DeveloperInput): Promise<Developer> {
    const developer: Developer = {
      ...input,
      progress: null,
      issueId: null,
    };

    await this.dataSource.create(developer);

    return developer;
  }
}
