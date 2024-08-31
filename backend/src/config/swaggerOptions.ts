import swaggerJsdoc from "swagger-jsdoc";
import { ENV } from "./env";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Median Express API with Swagger",
      version: "1.0.0",
      description:
        "API documentation by Swagger for Median, a Medium clone built to enable users to share stories, thoughts, and ideas in a clean and minimalistic platform.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Median",
        url: "https://github.com/Ziad-I/Median.git",
      },
    },
    servers: [
      {
        url: `http://localhost:${ENV.PORT || 3000}`,
      },
    ],
  },
  apis: ["../routers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
