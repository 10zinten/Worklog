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
      repos: [] as string[],
      contribRepos: [] as string[],
      date: '' as string,
      monthlyContributions: [] as dailyContributions[],
      loading: false as boolean,
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
      if (!this.username && !value) return;

      // fetch data
      const response = await axios.get(
        'https://raw.githubusercontent.com/10zinten/Worklog/main/data/contributors_repos.json'
      );

      this.repos = response.data[this.username];
      this.contribRepos = response.data[this.username];
    },

    async fetchRepoBranchs(org: string, repo: string): Promise<string[]> {
      const orgRepo = `${org}/${repo}`;
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
      // fetch all repo's branches and cache them in repoToBranches
      this.loading = true;
      for (const repo of this.contribRepos) {
        const [org, repoName] = repo.split('/');
        await this.fetchRepoBranchs(org, repoName);
      }
      this.loading = false;

      const year = this.date.split('-')[0];
      const month = this.date.split('-')[1];
      const days = getDaysForMonth(parseInt(month));
      days.forEach(async (day) => {
        this.monthlyContributions.push({
          date: `${year}-${month}-${day}`,
          contributions: [] as string[],
        });
        const dailyContrib = this.monthlyContributions.at(-1);

        this.contribRepos.forEach((orgRepo) => {
          const [org, repo] = orgRepo.split('/');
          const branches = this.repoToBranches[orgRepo];
          branches.forEach(async (branch: string) => {
            if (branch.startsWith('dependabot')) return;
            const dailyRepoBranchContrib = `https://github.com/${org}/${repo}/commits/${branch}?author=${this.username}&since=${dailyContrib?.date}&until=${dailyContrib?.date}`;
            dailyContrib?.contributions.push(dailyRepoBranchContrib);
          }); // branches
        }); // repos
      }); // days
    },
  },
});
