export const environment = {
  production: false,
  apiUrl: process.env["AMAD_BASE_API_URL_QA"] ??"",
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  SECRET_KEY:process.env['AMAD_LOGIN_SECRET_KEY_QA'] ??"",
  PERMISSION: process.env['AMAD_LOGIN_SECRET_KEY_QA']??"",

  TOKEN_IV_SECRET_PHRASE:process.env['AMAD_TOKEN_IV_SECRET_PHRASE_QA'] ??"",
  TOKEN_SECRET_PHRASE:process.env['AMAD_TOKEN_SECRET_PHRASE_QA'] ??"",
  URL_DOWNLOAD_DOCUMENT: process.env['AMAD_URL_DOCUMENTS_KEY_QA']??"",
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  LOGIN_KEY:process.env['AMAD_LOGIN_KEY_QA'],
};
