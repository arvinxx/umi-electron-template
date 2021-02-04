import { remote, shell as _shell } from 'electron';

export const database: Main.DataBase = remote.getGlobal('database');

export const logger: Main.Logger = remote.getGlobal('logger');

export const getLogger: Main.GetLogger = remote.getGlobal('getLogger');

export const shell = _shell;
