using Batches.Models;

namespace Batches.Data
{
    public class GoldenBatch : BatchModel
    {
        public GoldenBatch()
        {
            Name = "Golden Batch";

            Args = @"\\swr11900 e:\waypointBatch\stest\wpExecuteables\Accounting e:\waypointBatch\stest\wpExecuteables\Accounting\AccountingBatchExecutor.exe";
            
            
        }
    }
}