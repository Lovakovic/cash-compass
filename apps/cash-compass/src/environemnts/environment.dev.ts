declare let _env: any;

export const environment = {
  mode: _env && _env.MODE ? _env.MODE : 'development',
  apiUrl: _env && _env.API_URL ? _env.API_URL : 'http://localhost:3000',
};
