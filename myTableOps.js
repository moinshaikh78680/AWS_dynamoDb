import { DynamoDBClient,DescribeTableCommand,CreateTableCommand, UpdateTableCommand,ListTablesCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
let createTable=async()=>{
let command=new CreateTableCommand({
    TableName: "FirstTable",
   AttributeDefinitions: [
       {
           AttributeName: "Student_id",
           AttributeType: "N"
       },
       {
        AttributeName: "Subject_id",
        AttributeType: "N"
    },
    {
        AttributeName: "result",
        AttributeType: "S"
    },
   ],
    KeySchema: [
         {
              AttributeName: "Student_id",
              KeyType: "HASH"
         },
         {
          AttributeName: "Subject_id",
          KeyType: "RANGE"
     },
    ],
    LocalSecondaryIndexes: [
        {
            IndexName: "result",
            KeySchema: [
                {
                    AttributeName: "Student_id",
                    KeyType: "HASH"
                },
                {
                    AttributeName: "result",
                    KeyType: "RANGE"
                },
            ],
            Projection: {
                ProjectionType: "ALL"
            }
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
});
let response = await client.send(command);
console.log(response);
}
//createTable();


let updateTable=async()=>{
    let command=new UpdateTableCommand({
        TableName: "FirstTable",
        ProvisionedThroughput: {
            ReadCapacityUnits: 2,
            WriteCapacityUnits: 2
        }
    });
    let response = await client.send(command);
    console.log(response);
    
}
//updateTable();
const listTbalbes=async()=>{
    let command=new ListTablesCommand({});
    let response = await client.send(command);
    console.log(response);
}
//listTbalbes();

const describeTbl=async()=>{
    let command=new DescribeTableCommand({
        TableName: "FirstTable"
    });
    let response = await client.send(command);
    console.log(JSON.stringify(response));
}
describeTbl();


