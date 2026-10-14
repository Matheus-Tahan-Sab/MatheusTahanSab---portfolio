import GitHubLanguages from '../GitHub/GitHubLanguages.jsx';
import GITHUB_CONFIG from '../../config/githubConfig.js';

export default function GitHubPanel() {
  const username = GITHUB_CONFIG.USERNAME;
  return <div className="github-panel"><GitHubLanguages username={username} /></div>;
}
