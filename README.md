# 基于本体的众智化教学平台

一个基于本体的众智化教学平台，技术栈包括：

- 前端：React
- Web 服务器：Node.js
- 数据库：MongoDB
- ~~本体查询服务器：Python, Flusk~~
- SPARQL 服务器：Fuseki

## 环境要求

- Node.js
- MongoDB
- Yarn

## 配置

- 为 MongoDB 设置用户鉴权，并在 PATH_TO_PROJECT/server/config 路径下新建 dev.json 文件，参照 default.json 填入配置
- 运行 Fuseki 服务器（默认为 3030 端口）并将制作好的本体文件导入

## 安装

1. 在项目路径及 PATH_TO_PROJECT/server 路径下运行 `yarn install` 
2. 分别在两个终端下打开项目路径及 PATH_TO_PROJECT/server 路径，并执行 `npm start`


