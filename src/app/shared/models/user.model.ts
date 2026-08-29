export default interface User {
  _id: string;
  email: string;
  name: string;
  picture: string;
  role: 'administrator' | 'user' | 'anonymous';
}
