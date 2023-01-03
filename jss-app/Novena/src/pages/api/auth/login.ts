import { NextApiRequest, NextApiResponse } from 'next';
import config from 'temp/config';
import queryString from 'query-string';
import nookies, { parseCookies } from 'nookies';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  console.log(req.body);
  const loginEndpoint = `${config.sitecoreApiHost}/sitecore/api/ssc/auth/login?sc_apikey=${config.sitecoreApiKey}`;

  console.log(loginEndpoint);
  const data = {
    domain: 'extranet',
    username: req.body.username,
    password: req.body.password,
  };
  const response = await fetch(loginEndpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
    method: 'POST',
    body: queryString.stringify(data),
  });
  // const parsedCookies = parseCookies();
  res.setHeader('set-cookie', response.headers.get('set-cookie'));
  res.status(200).json({ data: true });
}
