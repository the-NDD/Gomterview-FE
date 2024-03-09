import axios from 'axios';

export const cookieGenerator = async () => {
  await axios
    .get('/api/token')
    .then((response) => {
      const cookie =
        `accessToken=${response.headers.authorization};domain=localhost`.replace(
          /Bearer\s+/,
          'Bearer%20'
        );
      document.cookie = cookie;
    })
    .catch((e) => {
      const error = e as Error;
      alert(`토큰 설정 오류 ${error.message}`);
    });
};
