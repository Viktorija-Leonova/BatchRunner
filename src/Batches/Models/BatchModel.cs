using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Batches.Models
{
    public class BatchModel
    {
        [Required(ErrorMessage = "Name is required")]
        [MaxLength(50), MinLength(4)]
        [BsonElement("name")]
        [Display(Name = "name")]
        public string Name { get; set; }
        
        [BsonElement("args")]
        public string Args { get; set; }
        
        [BsonId]
        public ObjectId Id { get; set; }

    }
}