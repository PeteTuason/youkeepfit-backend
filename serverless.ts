import type { AWS } from '@serverless/typescript';

import { basicProfile, fitnessProfile, login, register } from '@functions/index';
import { AuthTable, UserTable } from '@resources/index';

const serverlessConfiguration: AWS = {
  service: 'youkeepfit-backend',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: '${opt:stage}',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      STAGE: '${opt:stage}',
      AUTH_TABLE: 'youkeepfit-auth-${opt:stage}',
      USER_TABLE: 'youkeepfit-user-${opt:stage}',
      SECRET: 'youkeepfit',
    },
    iam: {
      role: {
        statements: [{
          Effect: "Allow",
          Action: [
            "dynamodb:DescribeTable",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:GetItem",
            "dynamodb:BatchGetItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:DeleteItem",
          ],
          Resource: [
            "arn:aws:dynamodb:us-east-1:*:table/${self:provider.environment.AUTH_TABLE}",
            "arn:aws:dynamodb:us-east-1:*:table/${self:provider.environment.USER_TABLE}"
          ]
        }],
      },
    },
  },
  // import the function via paths
  functions: { register, login, basicProfile, fitnessProfile },
  package: { individually: true },
  custom:{
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb:{
      start:{
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: "${opt:stage}"
    }
  },
  resources: {
    Resources: {
      AuthTable,
      UserTable
    }
  }
};

module.exports = serverlessConfiguration;
