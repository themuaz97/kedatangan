import { ConfidentialClientApplication, LogLevel } from "@azure/msal-node";
import dotenv from 'dotenv';

dotenv.config()

export const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID as string,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET,
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel: LogLevel, message: string) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: LogLevel.Info,
    }
  }
};

export const pca = new ConfidentialClientApplication(msalConfig);