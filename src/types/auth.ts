/** {@link https://developers.worksmobile.com/jp/docs/auth-jwt#issue-access-token-response-body} */
export type IssueAccessTokenResponse = {
  access_token: string
  refresh_token: string
  scope: string
  token_type: 'Bearer'
  expires_in: number
};

/** {@link https://developers.worksmobile.com/jp/docs/auth-scope} */
export type Scope = 
  'audit.read' |
  'board' | 'board.read' |
  'bot.message' | 'bot' | 'bot.read' |
  'calendar' | 'calendar.read' |
  'contact' | 'contact.read' |
  'file' | 'file.read' |
  'group' | 'group.read' | 'group.folder' | 'group.folder.read' |
  'mail' | 'mail.read' |
  'orgunit' | 'orgunit.read' |
  'directory' | 'directory.read' |
  'partner' | 'partner.read' |
  'security.external-browser' | 'security.external-browser.read' |
  'user' | 'user.read' | 'user.email.read' | 'user.profile.read';
