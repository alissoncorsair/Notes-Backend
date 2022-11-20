/* eslint-disable no-undef */
module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        "@babel/preset-typescript",
        "minify",
    ],
    plugins: [
        [
            "module-resolver",
            {
                alias: {
                    "@config": "./src/config",
                    "@controllers": "./src/controllers",
                    "@modules": "./src/modules",
                    "@models": "./src/models",
                    "@schemas": "./src/schemas",
                    "@routes": "./src/routes",
                },
            },
        ],
        "babel-plugin-transform-typescript-metadata",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
    ],
    ignore: ["front-dist", "src/types/*.d.ts"],
};
