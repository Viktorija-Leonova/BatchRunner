using System;
using System.Collections.Generic;
using System.Diagnostics;
using Batches.Models;

namespace Batches.Runners
{
    internal class ProcessRunner
    {
        private static ProcessRunner _instance;
        
        public static ProcessRunner Get()
        {
            return _instance ?? (_instance = new ProcessRunner());
        }

        public string RunCmd(string command)
        {
            return RunCmd(new List<string> {command});
        }
        
        public string RunCmd(List<string> commands)
        {
            commands.ForEach(Console.WriteLine);
            
            var cmdStartInfo = new ProcessStartInfo
            {
                FileName = "cmd.exe",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                RedirectStandardInput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };
            
            var output = "";
            var cmdProcess = new Process();
            cmdProcess.StartInfo = cmdStartInfo;
            cmdProcess.ErrorDataReceived += (sender, e) =>
            {
                output += e.Data + "\n";
                Console.WriteLine("error: " + e.Data);
            };
            cmdProcess.OutputDataReceived += (sender, e) =>
            {
                output += e.Data + "\n";
                Console.WriteLine("output: " + e.Data);
            };
            cmdProcess.EnableRaisingEvents = true;
            
            cmdProcess.Start();
            cmdProcess.BeginOutputReadLine();
            cmdProcess.BeginErrorReadLine();

            commands.ForEach(command => cmdProcess.StandardInput.WriteLine(command));
            cmdProcess.StandardInput.WriteLine("exit");
            cmdProcess.WaitForExit(2*60*1000);
            
            return output;
        }

        public string RunGoldenBatch()
        {
            var args =
                @"\\swr11900 -u EUROPE\wa1 -p IFwa1P01 -w cmd /c e:\waypointBatch\stest\wpExecuteables\Accounting e:\waypointBatch\stest\wpExecuteables\Accounting\AccountingBatchExecutor.exe";

            var timeoutInMills = 2 * 60 * 1000;
            return RunPsExec(args, timeoutInMills);
        }

        public string RunPsExec(BatchModel batch)
        {
            return RunPsExec(batch.Args, 2 * 60 * 1000);
        }
        
        public string RunPsExec(string args, int timeoutInMills)
        {
            var cmdStartInfo = new ProcessStartInfo
            {
                FileName = @"D:\Tools\PSTools\PsExec.exe",
                Arguments = args,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };
            
            var cmdProcess = new Process();
            cmdProcess.StartInfo = cmdStartInfo;
            cmdProcess.Start();

            cmdProcess.WaitForExit(timeoutInMills);
            var output = cmdProcess.StandardOutput.ReadToEnd();
            var error = cmdProcess.StandardError.ReadToEnd();
            
            Console.WriteLine(output);
            Console.WriteLine(error);
            
            return "out:\n" +
                   $"{output}\n" +
                   "error:\n" +
                   $"{error}";
        }

        public string Ping(string ip)
        {
            var commands = new List<string> {$"ping {ip}"};
            return RunCmd(commands);
        }
        
        public string Test()
        {
            var commands = new List<string> {@"D:\test.cmd"};
            return RunCmd(commands);
        }
        
    }
}