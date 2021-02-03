import ElectronLog from 'electron-log';

process.on('uncaughtException', (error) => {
  ElectronLog.error(error);
});

window.onerror = (message, source, lineno, colno, err) => {
  ElectronLog.error(err?.stack || err);
};
