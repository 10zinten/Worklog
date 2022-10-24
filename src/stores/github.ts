import { defineStore } from 'pinia';
import axios, { AxiosInstance } from 'axios';
import { dailyContributions } from 'components/models';
import { LocalStorage } from 'quasar';

function getDaysForMonth(month: number): string[] {
  let nDays = 0;
  if (month < 8) {
    if (month % 2 === 0) {
      nDays = month === 2 ? 28 : 30;
    } else {
      nDays = 31;
    }
  } else {
    if (month % 2 === 0) {
      nDays = 31;
    } else {
      nDays = 30;
    }
  }
  return Array.from(Array(nDays).keys()).map((n) => {
    const day = n + 1;
    return day < 10 ? `0${day}` : `${day}`;
  });
}

export const LOCAL_STORAGE_KEYS = {
  USERNAME: 'w:username',
  GITHUB_TOKEN: 'w:github_token',
};

export const useGithubStore = defineStore('github', {
  state: () => {
    return {
      username: LocalStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME),
      githubToken: LocalStorage.getItem(LOCAL_STORAGE_KEYS.GITHUB_TOKEN),
      repos: [],
      contribRepos: [],
      date: '',
      monthlyContributions: [] as dailyContributions[],
      loading: false,
      repoToBranches: {} as { [orgRepo: string]: string[] },
    };
  },

  getters: {
    githubClient(state): AxiosInstance {
      if (state.githubToken) {
        return axios.create({
          baseURL: 'https://api.github.com',
          headers: {
            Authorization: `token ${state.githubToken}`,
          },
        });
      }
      return axios.create({
        baseURL: 'https://api.github.com',
      });
    },
  },

  actions: {
    async fetchContribRepos(value: string) {
      if (!this.username) return;

      // fetch data
      const response = await axios.get(
        'https://raw.githubusercontent.com/10zinten/Worklog/main/data/contributors_repos.json'
      );

      // TODO: remove slice
      this.repos = response.data[this.username].slice(0, 1);
      this.contribRepos = response.data[this.username].slice(0, 1);
    },

    async fetchRepoBranchs(org: string, repo: string): Promise<string[]> {
      const orgRepo = `${org}/${repo}`;
      console.log(this.repoToBranches[orgRe]);
      if (orgRepo in this.repoToBranches) {
        return this.repoToBranches[orgRepo];
      }
      const reponse = await this.githubClient.get(
        `/repos/${org}/${repo}/branches`
      );
      const branches = await reponse.data.map(
        (branch: { name: string }) => branch.name
      );
      this.repoToBranches[orgRepo] = branches;
      return branches;
    },

    async fetchMonthlyContributions() {
      this.monthlyContributions = [];
      const [_, month, year] = this.date.split('-');
      const days = getDaysForMonth(parseInt(month));
      days.forEach((day: string) => {
        this.monthlyContributions.push({
          date: `${year}-${month}-${day}`,
          contributions: [] as string[],
        });
        const dailyContrib = this.monthlyContributions.at(-1);
        this.contribRepos.forEach(async (repo: string) => {
          const [org, repo_name] = repo.split('/');
          const branches = await this.fetchRepoBranchs(org, repo_name);
          branches.forEach(async (branch: string) => {
            if (branch.startsWith('dependabot')) return;
            const dailyRepoBranchContrib = `https://github.com/${org}/${repo_name}/commits/${branch}?author=${this.username}&since=${dailyContrib['date']}&until=${dailyContrib['date']}`;
            dailyContrib?.contributions.push(dailyRepoBranchContrib);
          });
        });
      });
    },
  },
});
