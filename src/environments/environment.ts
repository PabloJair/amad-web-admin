export const environment = {
  apiUrl: process.env['AMAD_BASE_API_URL_PRD'] ?? '',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  SECRET_KEY: process.env['NG_APP_LOGIN_SECRET_KEY_PRD'] ?? '',
  PERMISSION: process.env['NG_APP_LOGIN_SECRET_KEY_PRD'] ?? '',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  LOGIN_KEY: process.env['NG_APP_LOGIN_KEY_PRD'] ?? '',
  production: true,
  TOKEN_IV_SECRET_PHRASE:
    process.env['NG_APP_TOKEN_IV_SECRET_PHRASE_PRD'] ?? '',
  TOKEN_SECRET_PHRASE: process.env['NG_APP_TOKEN_SECRET_PHRASE_PRD'] ?? '',
  URL_DOWNLOAD_DOCUMENT: process.env['NG_APP_URL_DOCUMENTS_KEY_PRD'] ?? '',
  URL_DOWNLOAD_DOCUMENT_HISTORICAL:
    process.env['NG_APP_URL_HISTORICAL_DOCUMENTS_KEY_PRD'] ?? '',

  apiURLSepomex: process.env['AMAD_BASE_API_URL_SEPOMEX_PRD'],
  apiKeySepomex: process.env['AMAD_BASE_API_KEY_SEPOMEX_PRD'],

  apiURLMonkey: process.env['AMAD_BASE_API_URL_MONKEY_PRD'],
  apiKeyMonkey: process.env['AMAD_BASE_API_KEY_MONKEY_PRD'],
};
