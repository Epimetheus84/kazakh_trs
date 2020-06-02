import {url} from '../components/serverUrl';

export function checkUserInfo () {
    fetch(`${url}/cabinet/me`, {
        headers: {
            Authorization: `token ${sessionStorage.tokenData}`
        }
      })
      .then(res => {return res.json();})
      .then(
          data => { 
            console.log("USER INFO", data)
            }
          );
}