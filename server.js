const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./news.proto";
console.log(PROTO_PATH);
var protoLoader = require("@grpc/proto-loader");
const db = require("./db");
const News = require("./models/newsSchema");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const newsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
let news = [
  { id: "1", title: "Note 1", body: "Content 1", postImage: "Post image 1" },
  { id: "2", title: "Note 2", body: "Content 2", postImage: "Post image 2" },
];

server.addService(newsProto.NewsService.service, {
  getAllNews: async(_, callback) => {
    try {
      const res = await News.find({})
      console.log("news fetched....")
      console.log(res)
     return callback(null,{news:res})
    
    } catch (error) {
      return callback({news:"news not found"},null)
    }
  },

  addNews: async (call, callback) => {
    console.log("from Server add News", call);
    const _news = {
      id: Date.now().toString(),
      title: call.request.title,
      body: call.request.body,
      postImage: call.request.postImage,
    };
    let res = await News.create(_news);
    console.log("db news stored");
    
    callback(null, res);
  },

  deleteNews: async (call, callback) => {
    const id = call.request.id;
    try {
      await News.deleteOne({ id });
      return callback(null, { message: "News deleted successfully" });
    } catch (error) {
      callback("Error",null)
    }
  },
  
  editNews:async(call,callback)=>{
    try {
      let id = call.request.id
      let title = call.request.title
      await News.findOneAndUpdate({id},{title})
      return callback(null,{message:"Edited successfully"})
    } catch (error) {
      callback(error,null)
      console.log("error got in edit news")
    }
  }
});

server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error(err);
      return;
    }
    db();
    console.log("Server running at http://127.0.0.1:50051");
  }
);
