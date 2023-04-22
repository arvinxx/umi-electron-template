import { protocol } from 'electron';
import path from 'path';
import { URL } from 'url';

export const createProtocol = (scheme: string) => {
  protocol.registerFileProtocol(scheme, (request, respond) => {
    let pathName = new URL(request.url).pathname;
    pathName = decodeURI(pathName); // Needed in case URL contains spaces

    const filePath = path.join(__dirname, '../renderer', pathName);
    respond({ path: filePath });
  });
};
