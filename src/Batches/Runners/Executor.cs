using Batches.Dao;
using Batches.Models;
using MongoDB.Driver;

namespace Batches.Runners
{
    public class Executor
    {
        private static Executor _instance;
        
        public static Executor Get()
        {
            return _instance ?? (_instance = new Executor());
        }
        
        private BatchesDao _database;
        
        public Executor()
        {
            _database = BatchesDao.Get();
        }
        
        public string RunBatchByName(string name)
        {
            var batch = _database.FindFirst(Builders<BatchModel>.Filter.Eq(b => b.Name, name), "batches");
            return RunBatch(batch);
        }

        public string RunBatch(BatchModel batch)
        { 
            var id = _database.CreateBatchLogRecord(batch.Name);
            var result = ProcessRunner.Get().RunPsExec(batch);
            _database.UpdateLog(id, result);
            return result;
        }
    }
}