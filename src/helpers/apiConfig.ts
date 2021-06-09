export const createApiconfig = (method?: string, body?: any): any => {

  const token = 'fadia.tarek19@gmail.com';
    const config = {
      headers: new Headers({
        'Authorization': `Basic ${token}`,
        Accept: 'application/json',
        'content-type': 'application/json',
      }),
      mode: 'no-cors',
      method: method || 'GET',
      body: JSON.stringify(body),
    };
    return config;
  };