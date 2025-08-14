import configFile from "../profile.toml?raw";
import { parse } from "toml";

export interface Config {
  dark: boolean | undefined;
  profile: {
    prefix: string | undefined;
    first_name: string;
    last_name: string;
    suffix: string | undefined;
    pronouns:
      | {
          nominative: string;
          oblique: string;
          possessive: string;
        }
      | undefined;
    email: string | undefined;
    phone: string | undefined;
  };
  categories: {
    order: string[];
    translations: Record<string, string> | undefined;
  };
}
const config: Config = parse(configFile.toString());

export default config;
