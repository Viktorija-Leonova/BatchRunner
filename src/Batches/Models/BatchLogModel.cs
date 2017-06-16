using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Batches.Models
{
    public class BatchLogModel
    {
        [BsonId]
        public ObjectId Id { get; set; }
        
        [BsonElement("name")]
        public string Name { get; set; }
        
        [BsonElement("started")]
        public DateTime Started { get; set; }
        
        [BsonElement("ended")]
        public DateTime Ended { get; set; }
        
        [BsonElement("status")]
        public string Status { get; set; }
        
        [BsonElement("log")]
        public string Log { get; set; }
        
        public BatchLogModel(string name)
        {
            Id = ObjectId.GenerateNewId();
            Name = name;
            Started = DateTime.Now;
            Status = "Running";
        }
        
    }
}