using System;
using Batches.Dao;
using Batches.Data;
using Batches.Models;
using Batches.Runners;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Batches.Controllers
{
    [Route("api")]
    public class BatchesController : Controller
    {

        [HttpPut("add")]
        public IActionResult Add([FromBody] BatchModel batch)
        {
            if (batch == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);

            batch.Id = ObjectId.GenerateNewId();
            
            BatchesDao.Get().Create(batch, "batches");
            
            return Ok();
        }
        
        
        [HttpPost("run")]
        public IActionResult Run([FromBody]BatchModel batch)
        {
            if (batch == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var result = Executor.Get().RunBatchByName(batch.Name);
            return Ok(result);
        }
        
        [HttpPost("get")]
        public IActionResult Get([FromBody]BatchModel batch)
        {
            if (batch == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var filter = Builders<BatchModel>.Filter.Eq(b => b.Name, batch.Name);
            var result = BatchesDao.Get().FindFirst(filter, "batches");
            return Ok(result);
        }
        
        [HttpPost("getlast/{amount}")]
        public IActionResult GetLast(int amount, [FromBody]BatchModel batch)
        {
            if (batch == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var filter = Builders<BatchLogModel>.Filter.Eq(l => l.Name, batch.Name);
            var sort = Builders<BatchLogModel>.Sort.Descending(l => l.Started);
            
            var result = BatchesDao.Get().FindLast(filter, sort, "logs", amount);
            return Ok(result);
        }
        
        [HttpGet("run/goldenpath")]
        public IActionResult Run()
        {
            var result = Executor.Get().RunBatch(new GoldenBatch());
            return Ok(result);
        }
        
        [HttpGet("run/ping")]
        public IActionResult Ping()
        {
            var ip = Request.HttpContext.Connection.LocalIpAddress.ToString();
            var result = ProcessRunner.Get().Ping(ip);
            return Ok(result);
        }
        
        [HttpGet("run/test")]
        public IActionResult Test()
        {
            var result = ProcessRunner.Get().Test();
            return Ok(result);
        }
        
    }
}
