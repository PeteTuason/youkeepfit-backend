export default {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: "${self:provider.environment.AUTH_TABLE}",
      AttributeDefinitions: [{
        AttributeName: "email",
        AttributeType: "S",
      }],
      KeySchema: [{
        AttributeName: "email",
        KeyType: "HASH"
      }],
      BillingMode: 'PAY_PER_REQUEST'
    }
  };