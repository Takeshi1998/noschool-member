# NoSchool Member MCP Server

NoSchool 社の従業員情報を取得するための MCP（Model Context Protocol）サーバーです。

## 概要

このリポジトリは、NoSchool 社のウェブサイトから従業員情報をスクレイピングし、MCP 経由で提供するサーバーを実装しています。学習目的で作成されたプロジェクトです。


## 使用方法


### MCP ツール

このサーバーは以下の MCP ツールを提供しています：

- `get_employees`: NoSchool 社の従業員情報を取得します
  - パラメータ:
    - `num`: 取得する従業員の数（デフォルト: 10）

### Setup
```json
{
  "mcpServers": {
    "noschool-member": {
      "command": "npx",
      "args": [
        "-y",
        "github:Takeshi1998/noschool-member"
      ]
    }
  }
}
```

#### 使用例

```
> NoSchool社の従業員を3人教えてください

MCPツールを使用して、NoSchool社の従業員情報を取得します：
名gene
あきら
こうたたけし
```

## 技術仕様

- TypeScript で実装
- [Model Context Protocol (MCP)](https://github.com/anthropics/model-context-protocol)を使用
- Puppeteer を使用してウェブスクレイピング

## ライセンス

ISC

## 注意事項

このプロジェクトは学習目的で作成されています。ウェブスクレイピングの使用に関しては、対象ウェブサイトの利用規約を確認してください。
