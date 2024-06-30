module.exports = {
    moduleFileExtensions: ["js", "json", "vue"],
    transform: {
        "^.+\\.vue$": "vue-jest",
        "^.+\\.js$": "babel-jest"
    },
    testMatch: ["**/tests/**/*.spec.(js|jsx|ts|tsx)"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    transformIgnorePatterns: ["/node_modules/"]
};
