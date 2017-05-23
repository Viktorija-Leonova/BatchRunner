using Batches.Data;
using Batches.Helpers;
using Batches.Models;
using Microsoft.AspNetCore.Mvc;

namespace Batches.Controllers
{
    [Route("api")]
    public class BatchesController : Controller
    {
        
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Hey!");
        }


        [HttpPost("run")]
        public IActionResult Run([FromBody]Batch batch)
        {
            if (batch == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ProcessRunner.Get().RunPsExec(batch);
            
            return Json(batch);
        }
        
        [HttpPost("run/goldenpath")]
        public IActionResult Run()
        {
            var result = ProcessRunner.Get().RunPsExec(new GoldenBatch());
            return Ok(result);
        }
        
        [HttpPost("run/ping")]
        public IActionResult Ping()
        {
            var ip = Request.HttpContext.Connection.LocalIpAddress.ToString();
            var result = ProcessRunner.Get().Ping(ip);
            return Ok(result);
        }

    }
}
