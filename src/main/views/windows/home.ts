import { WindowManger } from '@/utils';

class HomeWindow extends WindowManger {
  constructor() {
    super({ name: 'home', remote: true });
  }
}

export default HomeWindow;
