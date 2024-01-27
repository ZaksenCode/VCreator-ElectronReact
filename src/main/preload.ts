// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { ModStructure } from '../types';

export type Channels =
  | 'ipc-example'
  | 'open-directory-dialog'
  | 'read-mod-structure';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    invokeOpenDirectoryDialog: async (): Promise<string[]> => {
      return ipcRenderer.invoke('open-directory-dialog');
    },
    invokeReadModStructure: async (
      modPath: string
    ): Promise<ModStructure | null> => {
      return ipcRenderer.invoke('read-mod-structure', modPath);
    },
    invokeSaveFileContent: async (
      path: string,
      content: string
    ): Promise<boolean> => {
      return ipcRenderer.invoke('save-file-content', {path, content});
    },
    invokeLoadFileContent: async (
      path: string
    ): Promise<string | null> => {
      return ipcRenderer.invoke('load-file-content', {path});
    }
  }
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
