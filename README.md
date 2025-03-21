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
