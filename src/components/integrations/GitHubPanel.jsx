import GitHubProfileCard from '../GitHub/GitHubProfileCard.jsx';
import GitHubStats from '../GitHub/GitHubStats.jsx';
import GitHubLanguages from '../GitHub/GitHubLanguages.jsx';
import GitHubRepos from '../GitHub/GitHubRepos.jsx';
import GITHUB_CONFIG from '../../config/githubConfig.js';

export default function GitHubPanel() {
  const username = GITHUB_CONFIG.USERNAME;
  return <div className="github-panel"><GitHubProfileCard username={username} /><GitHubStats username={username} /><GitHubLanguages username={username} /><GitHubRepos username={username} /></div>;
}
