export const corsConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production'
  const productionUrls = ['https://budget-compass.com', 'https://www.budget-compass.com'];

  return {
    origin: isProduction ? productionUrls : 'http://localhost:4200',    credentials: true,
  }
}
