export interface CommonEnvironment {
  production: boolean;
  firebase: EnvironmentFirebase;
}

export interface EnvironmentFirebase {
  apiKey: string;
  authDomain: string;
  projectId: string
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}