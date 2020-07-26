import config from './config';

const listProcess = () => {
  // if (this.context.isInline == false) {
  //   return;
  // }
  if (this.context.isNextInline == false) {
    this.context.timerId1 = setInterval(
      () => this.context.postPersonToLine(),
      5000
    );
    this.context.timerId2 = setInterval(
      () => this.context.removePerson(),
      5000
    );
  }

  // this.timerId3 = setInterval(() => this.getPeople(), 2000);
};

const clearTimers = () => {
  clearInterval(this.context.timerId1);
  clearInterval(this.context.timerId2);
  clearInterval(this.context.timerId3);
};

const postPersonToLine = () => {
  let num = Math.floor(Math.random() * 50);
  const newUser = {
    name: `Test${num}`,
  };
  const userString = JSON.stringify(newUser);
  fetch(`${config.REACT_APP_API_ENDPOINT}/people`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: userString,
  }).catch((error) => {
    console.error({ error });
  });
};

const getPeople = () => {
  return fetch(`${config.REACT_APP_API_ENDPOINT}/people`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data[0] === this.context.userName) {
        this.context.clearTimers();
        this.context.setContext({ isNextInline: true });
      }
      this.context.setContext({
        people: data,
        isLoading: false,
      });
    });
};

export default {
  listProcess,
  clearTimers,
  postPersonToLine,
  getPeople,
};
