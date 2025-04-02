import {
  CreateTableCommand,
  type CreateTableCommandInput,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb"
import {
  DynamoDBDocumentClient,
  PutCommand,
  type PutCommandInput,
} from "@aws-sdk/lib-dynamodb"
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
const docClient = DynamoDBDocumentClient.from(dynamoDB)

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

// DynamoDB アイテム追加 API
app.post("/add-item", express.json(), async (req: Request, res: Response) => {
  const { id, task } = req.body

  const params: PutCommandInput = {
    TableName: TABLE_NAME,
    Item: { id, task, completed: false },
  }

  try {
    await docClient.send(new PutCommand(params))
  } catch (error) {
    console.error("Error adding item: ", error)
    res.status(500).send("Error adding item")
  }
})

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
