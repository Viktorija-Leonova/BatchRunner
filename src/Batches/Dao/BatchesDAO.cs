using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Batches.Models;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Batches.Dao
{
    public class BatchesDao
    {
        private static BatchesDao _instance;
        
        public static BatchesDao Get()
        {
            return _instance ?? (_instance = new BatchesDao());
        }

        private readonly MongoClient _client;
        private IMongoDatabase _db;
        
        public BatchesDao()
        {
            _client = new MongoClient("mongodb://localhost:27017");
            _db = _client.GetDatabase("batches");
        }

        public int GetNextIdFor<T>()
        {
            var id = typeof(T).ToString().ToLower() + "Id";
            var filter = Builders<BsonDocument>.Filter.Eq("_id", id);
            var update = Builders<BsonDocument>.Update.Inc("seq", 1);

            var asBsonValue = _db.GetCollection<BsonDocument>("counters").FindOneAndUpdate(filter, update);

            return 1;
        }

        public void Create<T>(T model, string collection)
        {
            _db.GetCollection<T>(collection).InsertOneAsync(model);
        }
        
        public void UpdateLog(ObjectId id, string log)
        {
            var filter = Builders<BatchLogModel>.Filter.Eq(l => l.Id, id);
            var update = Builders<BatchLogModel>.Update.Set(l => l.Log, log);
            
            _db.GetCollection<BatchLogModel>("logs").FindOneAndUpdate(filter, update);
        }
        
        public T FindFirst<T>(FilterDefinition<T> filter, string collection)
        {
            var result = _db.GetCollection<T>(collection).Find(filter).First();
            return result;
        }
        
        public T FindLast<T>(FilterDefinition<T> filter, string collection)
        {
            var result = _db.GetCollection<T>(collection).Find(filter).First();
            return result;
        }
        
        public List<T> FindLast<T>(FilterDefinition<T> filter, SortDefinition<T> sort, string collection, int amount)
        {
            var result = _db.GetCollection<T>(collection).Find(filter).Sort(sort).Limit(amount).ToList();
            return result;
        }
        
        public List<T> FindMany<T>(FilterDefinition<T> filter, string collection)
        {
            var result = _db.GetCollection<T>(collection).Find(filter).ToList();
            return result;
        }
        
        public ObjectId CreateBatchLogRecord(string batchName)
        {
            var log = new BatchLogModel(batchName);
            Create(log, "logs");
            return log.Id;
        }
        
    }
}