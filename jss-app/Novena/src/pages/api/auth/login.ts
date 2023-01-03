import { NextApiRequest, NextApiResponse } from 'next';
import config from 'temp/config';
import queryString from 'query-string';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  console.log(req.body);
  const loginEndpoint = `${config.sitecoreApiHost}/sitecore/api/ssc/auth/login?sc_apikey=${config.sitecoreApiKey}`;
  //   const loginEndpoint = `https://cm.novena.localhost/sitecore/api/ssc/auth/login?sc_apikey=${config.sitecoreApiKey}`;

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
  console.log(response);
  res.status(200).json({ data: true });
}
