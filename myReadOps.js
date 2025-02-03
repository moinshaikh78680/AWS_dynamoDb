import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = new DynamoDBDocumentClient(client);

const scanItem=async()=>{
    let command=new ScanCommand({
        TableName: "FirstTable"
    });
    let response=await docClient.send(command);
    console.log(response);
}
//scanItem();

const conditionalItem=async()=>{
    let command=new ScanCommand({
        ExpressionAttributeValues: {
            ":r": "fail"
        },
        ExpressionAttributeNames: {
            "#r": "result"
        },
         FilterExpression: "#r = :r",
        ProjectionExpression: "Student_id,Marks",
        TableName: "FirstTable",
    });
    let response=await docClient.send(command);
    console.log(response);
}
//conditionalItem();

const queryItem=async()=>{
    let command=new QueryCommand({
        TableName: "FirstTable",
        KeyConditionExpression: "Student_id = :s",
        ExpressionAttributeValues: {
            ":s": 2981
        }
    });
    let response=await docClient.send(command);
    console.log(response);
}
queryItem();