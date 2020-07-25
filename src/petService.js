import config from './config';

const getPetService = () => {
  return fetch(`${config.REACT_APP_API_ENDPOINT}/pets`).then((pets) => {
    return pets.json();
  });
};
// adoptButtonService = () => {
//   fetch(`${config.REACT_APP_API_ENDPOINT}/pets/dog`, {
//     method: 'DELETE',
//   })
//     .then(() => {
//       this.context.setContext({
//         isDogAdopted: true,
//       });
//       this.timerId = setTimeout(() => {
//         this.context.getPet();
//       }, 2000);
//     })
//     .catch((error) => {
//       console.error({ error });
//     });
// };
export default { getPetService };
