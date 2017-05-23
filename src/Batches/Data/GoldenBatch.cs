using Batches.Models;

namespace Batches.Data
{
    public class GoldenBatch : Batch
    {
        public GoldenBatch()
        {
            Name = "Reminder batch";
            Server = @"\\swr11900";
            WorkingDir = @"e:\waypointBatch\compl\wpExecuteables\Accounting";
            BatchExe = @"e:\waypointBatch\compl\wpExecuteables\Accounting\AccountingBatchExecutor.exe";
            BatchParams = @"DC_ExportInvoice -L401 %InvoiceSendDate%";
        }
    }
}