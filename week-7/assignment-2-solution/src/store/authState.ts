import { atom } from 'recoil';
import { IAuth } from './interface';

const authState = atom<IAuth>({
    key: 'authState',
    default: { token: null, username: null }
});

export default authState;