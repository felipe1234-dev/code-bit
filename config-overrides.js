//const path = require("path");
//const { addWebpackAlias } = require("customize-cra");

module.exports = function override(config, env) {
    // Adiciona o path alias
    /*config = addWebpackAlias({
        "@api": path.resolve(__dirname, "src/api"),
        "@components": path.resolve(__dirname, "src/components"),
        "@providers": path.resolve(__dirname, "src/providers"),
        "@constants": path.resolve(__dirname, "src/constants"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@screens": path.resolve(__dirname, "src/screens"),
        "@i18n": path.resolve(__dirname, "src/i18n"),
        "@utils": path.resolve(__dirname, "src/utils"),
    })(config);*/

    /*config.module.rules.push({
        test: /\.svg$/,
        exclude: /node_modules/,
        use: {
            loader: "svg-react-loader",
            options: {
                tag: "symbol",
                attrs: {
                    title: "example",
                },
                name: "MyIcon",
            },
        },
    });*/

    return config;
};
