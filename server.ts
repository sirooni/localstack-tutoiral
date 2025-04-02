import {
  CreateTableCommand,
  type CreateTableCommandInput,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb"
import express, { Request, Response } from "express"

const PORT = 3000
const TABLE_NAME = "TutorialTable"
const REGION = "ap-northeast-1"

const app = express()

// DynamoDBの設定
const dynamoDB = new DynamoDBClient({
  region: REGION,
  endpoint: "http://localhost:4566", // LocalStackのDynamoDBエンドポイント
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
})

// DynamoDB テーブル作成 API
app.get("/create-table", async (_req: Request, res: Response) => {
  const params: CreateTableCommandInput = {
    TableName: TABLE_NAME,
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "S" } as const,
    ],
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" } as const],
    ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
  }

  try {
    const data = dynamoDB.send(new CreateTableCommand(params))
    res.json(data)
  } catch (error) {
    console.error("Error creating table: ", error)
    res.status(500).send("Error creating table")
  }
})

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
