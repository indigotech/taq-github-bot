import { argv } from 'process';

const RequiredArgs = ['repo-name=', 'github=', 'github-token='];

interface RequiredArgs {
  repoName: string;
  github: string;
  githubToken: string;
}

function parseArgs() {
  const args = argv.slice(2);

  const [repoName, github, githubToken] = RequiredArgs.map((requiredArg) => {
    const foundArg = args.find((arg) => arg.includes(requiredArg));
    return foundArg?.split(requiredArg)[1];
  });

  if (!repoName || !github || !githubToken) {
    throw new Error(`
      One or more required arguments were not sent. Please provide the 3 required arguments:
        + repo-name: name of the repository to be created. Ex: repo-name=onboard-uncle-bob
        + github: the github account of the person who will be onboarded. Ex: github=unclebob
        + github-token: the github token to authorize requests. Ex: github-token=abc123HYT39a=
    `);
  }

  return { repoName, github, githubToken };
}

const { repoName, github, githubToken } = parseArgs();

console.log('repoName:', repoName);
console.log('github:', github);
console.log('githubToken:', githubToken);

// Create repository with repoName arg
// Install taki-tiler or taki-tiler-server github bot on the repository
// Add area-development with read access
// Add "github" (arg) as admin of the repo
