import { remote, shell as _shell } from 'electron';

export const database: Main.Services = remote.getGlobal('services');

export const logger: Main.Logger = remote.getGlobal('logger');

export const getLogger: Main.GetLogger = remote.getGlobal('getLogger');

export const shell = _shell;
