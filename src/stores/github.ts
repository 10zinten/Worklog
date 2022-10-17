import { defineStore } from 'pinia';

export const useGithubStore = defineStore('github', {
  state: () => {
    return {
      repos: ['repo1', 'repo2', 'repo3'],
      contribRepos: [],
    };
  },
});
