# セットアップ

## コンテナの起動

- `docker run --rm -it -p 4566:4566 -p 4510-4559:4510-4559 localstack/localstack`
  | コマンド | 説明 |
  | ---- | ---- |
  | `docker run` | Docker コンテナを起動する
  | `--rm` | コンテナ終了時に自動で削除（不要なコンテナを残さない） |
  | `-it` | インタラクティブモードで起動（ターミナル操作可能） |
  | `-p 4566:4566` | ポート 4566 をホストとコンテナでマッピング（LocalStack の主要なエンドポイント） |
  | `-p 4510-4559:4510-4559` | 追加の AWS サービス用ポートをマッピング（Labmda などを使う際に必要） |
  | `localstack/localstack` | LocalStack の公式 Docker イメージ |

## AWS CLI & LocalStack CLI のセットアップ

### LocalStack CLI をインストール

- `pip install localstack awscli-local`

### AWS CLI の設定

- `aws configure set aws_access_key_id test`
- `aws configure set aws_secret_access_key test`
- `aws configure set region ap-northeast-1`

# DynamoDB テーブル作成

## 環境変数の設定

- `$env:AWS_ACCESS_KEY_ID="test"`
- `$env:AWS_SECRET_ACCESS_KEY="test"`

## DynamoDB テーブル作成

- `awslocal dynamodb create-table --table-name TutorialTable --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 --region ap-northeast-1`

| コマンド                                                            | 説明                                            |
| ------------------------------------------------------------------- | ----------------------------------------------- |
| `awslocal dynamodb create-table`                                    | LocalStack 内の DynamoDB で新しいテーブルを作成 |
| `--table-name TutorialTable`                                        | 作成するテーブルの名前を`TutorialTable`に設定   |
| `--attirbute-definitions AttributeName=id,AttributeType=S`          | テーブルの主キーとして`id`（文字列型）を定義    |
| `--key-schema AttributeName=id,KeyType=HASH`                        | `id`をプライマリキー（ハッシュキー）として使用  |
| `--provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1` | 読み取り・書き込みのキャパシティを`1`に設定     |
| `--region ap-northeast-1`                                           | 作成するリージョンを`ap-north-east-1`に設定     |

## テーブルが作成されたか確認

- `awslocal dynamodb list-tables --region ap-northeast-1`
