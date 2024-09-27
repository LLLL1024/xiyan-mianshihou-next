const { generateService } = require("@umijs/openapi");

generateService({
    requestLibPath: "import request from '@/libs/request'",
    schemaPath: "http://localhost:8108/api/v2/api-docs",
    serversPath: "./src",
});