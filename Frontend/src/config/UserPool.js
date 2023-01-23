import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_EpE8PGD9e",
  ClientId: "3ci69c4enra0trgb2jsdthhuoi",
};

export default new CognitoUserPool(poolData);