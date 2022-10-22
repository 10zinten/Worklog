import { defineStore } from 'pinia';
import axios from 'axios';
import { dailyContributions } from 'components/models';

async function fetchRepoBranchs(org: string, repo: string): Promise<string[]> {
  const reponse = await axios.get(
    `https://api.github.com/repos/${org}/${repo}/branches`
  );
  const branches = reponse.data.map((branch: { name: string }) => branch.name);
  return branches;
}

export const useGithubStore = defineStore('github', {
  state: () => {
    return {
      username: '',
      repos: [],
      contribRepos: [],
      date: '',
      monthlyContributions: undefined as dailyContributions[] | undefined,
    };
  },

  actions: {
    async fetchContribRepos(value: string) {
      console.log('fetchContribRepos', value);
      // fetch data
      const response = await axios.get(
        'https://raw.githubusercontent.com/10zinten/Worklog/main/data/contributors_repos.json'
      );
      this.repos = response.data[this.username];
      this.contribRepos = response.data[this.username];
    },

    async fetchMonthlyContributions() {
      this.contribRepos.forEach(async (repo: string) => {
        const [org, repo_name] = repo.split('/');
        const branches = await fetchRepoBranchs(org, repo_name);
        console.log(repo, branches);
      });
    },
  },
});
