module.exports = {
  setupFilesAfterEnv: ["<rootDir>/enzyme.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  globals: {
    "ts-jest": {
      tsConfigFile: 'jest.tsconfig.json',
    }
  }
};