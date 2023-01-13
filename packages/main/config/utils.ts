import chalk from 'chalk';
import { resolve } from 'path';

export const isDev = process.env.NODE_ENV === 'development';

export const srcPath = resolve(__dirname, '../..');

export const handleLog = (data: string) => {
  const moduleRegex = /^\[.*\]/g; // https://regex101.com/r/e34hRZ/1

  if (moduleRegex.test(data)) {
    data.replace(moduleRegex, (str, index, all) => {
      const logName = str;
      const logData = all.split(`${str} `)[1];

      switch (logName) {
        case '[Broadcast]':
        case '[Fetch]':
          console.log(chalk.blue(logName), chalk.yellow(logData));
          break;
        case '[Emit]':
        case '[Start]':
        case '[End]':
          console.log(chalk.blue(logName), chalk.green(logData));
          break;
        case '[Browser]':
          console.log(chalk.blue(logName), chalk.gray(logData));
          break;
        case '[Error]':
          console.log(chalk.red(logName), chalk.red(logData));
          break;
        case '[Info]':
        case '[Data]':
          // eslint-disable-next-line no-case-declarations
          let newData = '';
          newData += chalk.blue('› ');
          try {
            newData += chalk.grey(JSON.stringify(JSON.parse(logData), null, 4));
          } catch {
            newData += chalk.grey(logData);
          }
          console.log(newData);
          break;
        default:
          console.log(data);
          break;
      }

      return str;
    });
    return;
  }

  console.log(data);
};
