const AWS = require("aws-sdk");
const path = require("path");
const dotenv = require('dotenv');
dotenv.config();

AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000"
});

// AWS.config.update({
//   region: process.env.DY_REGION,
//   accessKeyId: process.env.DY_ACCESSK_KEY,
//   secretAccessKey: process.env.DY_SECRET_KEY,
// });
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

exports.createTable = (tableName) => {

  var params = {
    TableName: tableName,
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" },
    ],
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "S" },
      { AttributeName: "userId", AttributeType: "S" },

    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'user_index',
        KeySchema: [
          {
            AttributeName: 'userId',
            KeyType: 'HASH',
          }
        ],
        Projection: {
          ProjectionType: "ALL",
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1
        }
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  }
  return dynamodb.createTable(params).promise();
}
exports.deleteTable = (oneBy = null) => {
  if(oneBy) {
    return dynamodb.deleteTable({
      TableName: oneBy
    }).promise();
  } else {
    return dynamodb.listTables({}).promise()
      .then(data => {
        data.TableNames.forEach(item => {
          dynamodb.deleteTable({
            TableName: item
          }).promise();
        })
      })
  }
}
exports.listTable = () => {
  return dynamodb.listTables({}).promise()
}

exports.create = (params) => {
  return docClient.put(params).promise();
}

exports.fetchAll = (params) => {
  return docClient.scan(params).promise();
}
exports.fetchOne = (params) => {
  return docClient.get(params).promise();
}

exports.delete = (params) => {
  return docClient.get(params).promise();
}
exports.update = (params) => {
  return docClient.update(params).promise();
}
exports.query = (params) => {
  return docClient.query(params).promise();
}

const filter = (arr) => {
  let total = {};
  arr.forEach(item => {
    if(!total[item.country]) {
      total[item.country] = 1;
    } else {
      total[item.country] = total[item.country] + 1;
    }
  });
  return total;
};

const siteUrl = (req, opt = null) => {
  return req.protocol + "://" + req.get("host") + opt;
};
exports.siteUrl = siteUrl;

exports.splitUrl = url => {
  return url.trim().toLowerCase().split(" ").join("-");
};

exports.toText = url => {
  if(url) {
    const item = url.trim();
    return item.split("-").join(" ");
  }
  return "";
};
exports.currentPath = url => {
  return path.resolve(url);
};


exports.todayIs = () => {
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const date = new Date();
  const monthVerify = month[date.getMonth()] > 9 ? month[date.getMonth()] : "0" + month[date.getMonth()];
  const todayIs = date.getFullYear() + "-" + monthVerify + "-" + date.getDate();
  return todayIs;
};

exports.todayUs = () => {
  const todayUs = new Date().toLocaleString("en-US", { timeZone: "Europe/Dublin", hour12: true });
  const curDate = new Date(todayUs);
  return curDate.getTime();
};
exports.todayMin = (oldDate) => {
  const curDate = new Date();
  const oldDateFind = new Date(oldDate);
  const min = (curDate.getTime() - oldDateFind.getTime()) / 60000;
  return min;
};
exports.todayDate = () => {
  return new Date().toLocaleString("en-US", { timeZone: "Europe/Dublin", hour12: true });
};
