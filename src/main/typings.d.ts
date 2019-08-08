declare module 'electron-config';
declare module 'electron';
declare module 'electron-is';
declare module 'electron-log';
declare module 'umi-types';
declare module 'electron-updater';
declare var console:Console;

declare module NodeJS  {
    interface Global {
        services: any,
        configs:any
    }
}

declare var $dirname:string;