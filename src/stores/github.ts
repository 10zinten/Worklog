import { defineStore } from 'pinia';
import axios from 'axios';
import { dailyContributions } from 'components/models';

const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

async function fetchRepoBranchs(org: string, repo: string): Promise<string[]> {
  const reponse = await githubAPI.get(`/repos/${org}/${repo}/branches`);
  const branches = reponse.data.map((branch: { name: string }) => branch.name);
  return branches;
}

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

export const useGithubStore = defineStore('github', {
  state: () => {
    return {
      username: '',
      repos: [],
      contribRepos: [],
      date: '',
      monthlyContributions: [] as dailyContributions[] | undefined,
    };
  },

  actions: {
    async fetchContribRepos(value: string) {
      console.log(process.env.GITHUB_TOKEN);
      console.log('fetchContribRepos', value);
      // fetch data
      const response = await axios.get(
        'https://raw.githubusercontent.com/10zinten/Worklog/main/data/contributors_repos.json'
      );
      this.repos = response.data[this.username];
      this.contribRepos = response.data[this.username];
    },

    async fetchMonthlyContributions() {
      const [_, month, year] = this.date.split('-');
      const days = getDaysForMonth(parseInt(month));
      days.forEach((day: string) => {
        const dailyContrib = {
          date: `${year}-${month}-${day}`,
          contributions: [] as string[],
        };
        this.contribRepos.forEach(async (repo: string) => {
          const [org, repo_name] = repo.split('/');
          const branches = await fetchRepoBranchs(org, repo_name);
          branches.forEach(async (branch: string) => {
            if (branch.startsWith('dependabot')) return;
            const dailyRepoBranchContrib = `https://github.com/${org}/${repo_name}/commits/${branch}?author=${this.username}&since=${dailyContrib['date']}&until=${dailyContrib['date']}`;
            dailyContrib['contributions'].push(dailyRepoBranchContrib);
          });
        });
        this.monthlyContributions?.push(dailyContrib);
        console.log(this.monthlyContributions);
      });
    },
  },
});
