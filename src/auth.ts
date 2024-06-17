import { createJWT } from "./jwt.ts";
import type { AuthEnv, IssueAccessTokenResponse, Scope } from "./types.ts";
import { AUTH_TOKEN_ENDPOINT, REVOKE_TOKEN_ENDPOINT } from "./endpoints.ts";

export type AuthInterface = {
  fetchAccessToken(): Promise<string | undefined>;
};

class AuthContext {
  constructor(
    private readonly raw: IssueAccessTokenResponse,
    private readonly issueDate: number,
  ) {}

  get accessToken() {
    return this.raw.access_token;
  }

  get refreshToken() {
    return this.raw.refresh_token;
  }

  get scopes() {
    const scopes = this.raw.scope.split(" ");
    return scopes as Scope[];
  }

  static newContext(token: IssueAccessTokenResponse) {
    return new AuthContext(token, AuthContext.createTimestamp());
  }

  private static createTimestamp = () => Math.floor(Date.now() / 1000);

  isAccessTokenExpired() {
    return this.raw.expires_in + this.issueDate < AuthContext.createTimestamp();
  }

  isRefreshTokenExpired() {
    const defaultExpiresIn = 60 * 60 * 24 * 90; // 90 days
    return defaultExpiresIn + this.issueDate < AuthContext.createTimestamp();
  }
}

export class Auth implements AuthInterface {
  private c?: AuthContext;

  constructor(
    private readonly env: AuthEnv,
    private readonly scopes: Scope[],
  ) {}

  async fetchAccessToken() {
    if (this.c !== undefined) {
      if (!this.c.isAccessTokenExpired()) {
        return this.c.accessToken;
      }

      if (!this.c.isRefreshTokenExpired()) {
        const refreshedToken = await this.refreshToken();
        if (refreshedToken !== undefined) {
          this.c = AuthContext.newContext(refreshedToken);
          return this.c.accessToken;
        }
      }
    }

    const token = await this.issueToken();
    if (token === undefined) return undefined;

    this.c = AuthContext.newContext(token);

    return this.c.accessToken;
  }

  /** Use caching AuthContext */
  get context() {
    return this.c;
  }
  /** Use restore AuthContext */
  set context(c: AuthContext | undefined) {
    if (c === undefined) return;
    if (JSON.stringify(this.scopes) === JSON.stringify(c.scopes)) {
      this.c = c;
    }
  }

  /** {@link https://developers.worksmobile.com/jp/docs/auth-oauth#issue-access-token} */
  private async issueToken() {
    const response = await this.postRequest(AUTH_TOKEN_ENDPOINT, {
      assertion: await createJWT(this.env),
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      client_id: this.env.clientId,
      client_secret: this.env.clientSecret,
      scope: this.scopes.join(" "),
    });

    if (!response.ok) return undefined;

    const token = await response.json() as IssueAccessTokenResponse;
    token.expires_in = Number(token.expires_in);

    return token;
  }

  /** {@link https://developers.worksmobile.com/jp/docs/auth-oauth#refresh-access-token} */
  private async refreshToken() {
    if (this.c === undefined) return undefined;

    const response = await this.postRequest(AUTH_TOKEN_ENDPOINT, {
      refresh_token: this.c.refreshToken,
      grant_type: "refresh_token",
      client_id: this.env.clientId,
      client_secret: this.env.clientSecret,
    });

    if (!response.ok) return undefined;

    const token = await response.json() as IssueAccessTokenResponse;
    token.expires_in = Number(token.expires_in);

    return token;
  }

  /** {@link https://developers.worksmobile.com/jp/docs/auth-oauth#revoke-token} */
  async revokeToken() {
    if (this.c === undefined) return;

    const response = await this.postRequest(REVOKE_TOKEN_ENDPOINT, {
      client_id: this.env.clientId,
      client_secret: this.env.clientSecret,
      token: this.c.refreshToken,
    });

    if (!response.ok) {
      console.error(response);
    }

    this.c = undefined;
    return response;
  }

  private postRequest(endpoint: string, query: Record<string, string>) {
    return fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(query),
    });
  }
}
