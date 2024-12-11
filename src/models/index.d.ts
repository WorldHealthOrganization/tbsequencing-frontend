export {};
declare global {
  interface Window {
    heap: {
      identify: (userId: number) => void;
      addUserProperties: (userProps: Record<string, string>) => void;
      removeEventProperty: (userProp: string) => void;
      load: (appId?: string) => void;
      loaded: boolean;
    }
    Cookiebot: {
      consent: {
        statistics: boolean,
      }
    }
  }
}
