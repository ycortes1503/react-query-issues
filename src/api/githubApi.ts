import axios from "axios";

export const githubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization:
      "Bearer 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",
  },
});
