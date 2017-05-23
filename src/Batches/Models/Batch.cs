using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Batches.Models
{
    public class Batch
    {
        [Required(ErrorMessage = "Name is required")]
        [MaxLength(50)]
        public string Name { get; set; }
        
        public string Server { get; set; }

        public string WorkingDir { get; set; }
        
        public string BatchExe { get; set; }

        public string BatchParams { get; set; }

    }
}