/** @see {@link https://developers.worksmobile.com/jp/docs/auth-jwt#issue-access-token-response-body} */
export type IssueAccessTokenResponse = {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: "Bearer";
  expires_in: number;
};
