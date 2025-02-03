 import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
 import { DynamoDBDocumentClient, PutCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

 const client = new DynamoDBClient({ region: "us-east-1" });
 const docClient= new DynamoDBDocumentClient(client);

 let create=async(Student_id,Subject_id,Mark,result,grade)=>{
    let command=new PutCommand({
        TableName: "FirstTable",
        Item: {
            Student_id,
            Subject_id,
            Mark,
            result,
            grade
        }
   
 })
let response=await docClient.send(command);
console.log(response);
}
 //create(2981, 32, 89, "Pass","A+");

 const updateItem=async()=>{
    let command=new UpdateCommand({
        TableName: "FirstTable",
        Key: {
            Student_id: 1,
            Subject_id: 1
        },
        UpdateExpression: "set #m=:m,#r=:r",
        ExpressionAttributeValues: {
            ":m": 95,
            ":r": "PASS"
            
        },
        ExpressionAttributeNames: {
            "#r": "result",
            "#m": "Mark"
        }
    });
    let response=await docClient.send(command);
    console.log(response);
 }
 //updateItem();

 const deletItem=async()=>{
    let command=new DeleteCommand({
        TableName: "FirstTable",
        Key: {
            Student_id: 6524,
            Subject_id: 1
        }
    });
    let response=await docClient.send(command);
    console.log(response);
 }
 deletItem();