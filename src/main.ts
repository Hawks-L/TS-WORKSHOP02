import { config } from "dotenv";
import { expand } from "dotenv-expand";
// Carga .env y expande ${VAR}
expand(config());

import { ServerBootstrap } from "./config/ServerBootstrap";

new ServerBootstrap();