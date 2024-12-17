export const environment = {
  production: false,
  apiUrl: process.env['AMAD_BASE_API_URL_DEV'] ?? '',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  SECRET_KEY: process.env['AMAD_LOGIN_SECRET_KEY_DEV'] ?? '',
  PERMISSION: process.env['AMAD_LOGIN_SECRET_KEY_DEV'] ?? '',

  TOKEN_IV_SECRET_PHRASE: process.env['AMAD_TOKEN_IV_SECRET_PHRASE_DEV'] ?? '',
  TOKEN_SECRET_PHRASE: process.env['AMAD_TOKEN_SECRET_PHRASE_DEV'] ?? '',
  URL_DOWNLOAD_DOCUMENT: process.env['AMAD_URL_DOCUMENTS_KEY_DEV'] ?? '',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  LOGIN_KEY: process.env['AMAD_LOGIN_KEY_DEV'],

  apiURLSepomex: process.env['AMAD_BASE_API_URL_SEPOMEX_DEV'],
  apiKeySepomex: process.env['AMAD_BASE_API_KEY_SEPOMEX_DEV'],
};
