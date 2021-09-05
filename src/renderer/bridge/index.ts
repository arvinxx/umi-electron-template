import { remote, shell as _shell } from 'electron';

export const getLogger: Main.GetLogger = remote.getGlobal('getLogger');

export const shell = _shell;
