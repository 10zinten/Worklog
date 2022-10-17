import { defineStore } from 'pinia';

export const useGithubStore = defineStore('github', {
  state: () => {
    return {
      username: '',
      repos: ['repo1', 'repo2', 'repo3'],
      contribRepos: [],
      date: '',
    };
  },
});
