export const environment = {
  apiUrl: process.env["AMAD_BASE_API_URL_PRD"],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  SECRET_KEY: 'NG_APP_LOGIN_SECRET_KEY_PRD',
  PERMISSION: 'NG_APP_LOGIN_SECRET_KEY_PRD',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  LOGIN_KEY: 'NG_APP_LOGIN_KEY_PRD',
  production: true,
  TOKEN_IV_SECRET_PHRASE: 'NG_APP_TOKEN_IV_SECRET_PHRASE_PRD',
  TOKEN_SECRET_PHRASE: 'NG_APP_TOKEN_SECRET_PHRASE_PRD',
  URL_DOWNLOAD_DOCUMENT: 'NG_APP_URL_DOCUMENTS_KEY_PRD',
  URL_DOWNLOAD_DOCUMENT_HISTORICAL: 'NG_APP_URL_HISTORICAL_DOCUMENTS_KEY_PRD',
};
