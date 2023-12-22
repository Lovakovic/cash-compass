declare let _env: never;

export const environment = {
  mode: _env ?? 'development',
  apiUrl: _env ?? 'http://localhost:3000',
};
