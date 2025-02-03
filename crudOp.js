 import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
 import { DynamoDBDocumentClient, PutCommand, UpdateCommand, DeleteCommand , BatchWriteCommand } from "@aws-sdk/lib-dynamodb";

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
// deletItem();

 let demoData = [
    { Student_id: 111, Subject_id: 1, result: "pass",Marks:90 },
    { Student_id: 352, Subject_id: 2, result: "pass",Marks:50 },
    { Student_id: 325, Subject_id: 3, result: "fail",Marks:20 },
    { Student_id: 398, Subject_id: 1, result: "pass",Marks:75 },
    { Student_id: 874, Subject_id: 2, result: "pass",Marks:85 },
    { Student_id: 852, Subject_id: 3, result: "pass",Marks:88 },
    { Student_id: 632, Subject_id: 1, result: "pass",Marks:77 },
    { Student_id: 124, Subject_id: 2, result: "pass",Marks:97},
    { Student_id: 745, Subject_id: 3, result: "pass",Marks:99 },
    { Student_id: 658, Subject_id: 1, result: "pass",Marks:98 },
    { Student_id: 659, Subject_id: 2, result: "pass",Marks:91 },
    { Student_id: 658, Subject_id: 3, result: "pass",Marks:62 },
    { Student_id: 625, Subject_id: 1, result: "pass",Marks:61 },
    { Student_id: 873, Subject_id: 2, result: "pass",Marks:58 },
    { Student_id: 101, Subject_id: 3, result: "pass",Marks:55 },
    { Student_id: 110, Subject_id: 1, result: "pass",Marks:35 },
    { Student_id: 100, Subject_id: 2, result: "pass",Marks:39 },
    { Student_id: 123, Subject_id: 3, result: "pass",Marks:45},
    { Student_id: 321, Subject_id: 1, result: "pass",Marks:44 },
    { Student_id: 654, Subject_id: 2, result: "pass",Marks:88 },
    { Student_id: 987, Subject_id: 3, result: "pass",Marks:89 },
    { Student_id: 849, Subject_id: 1, result: "pass",Marks:97 },
    { Student_id: 999, Subject_id: 2,result: "pass",Marks:97 }
  ];

  const batchPush=async()=>{
    let command=new BatchWriteCommand({
        RequestItems: {
            ["FirstTable"]: demoData.map(item => {
                return {PutRequest: {Item: item}}
            })
        }
    });
    let response = await client.send(command);
    console.log(response);
  }
  batchPush();