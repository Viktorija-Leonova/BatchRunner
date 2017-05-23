using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using Batches.Models;

namespace Batches.Helpers
{
    public class ProcessRunner
    {
        private static ProcessRunner Instance => new ProcessRunner();
        
        public static ProcessRunner Get()
        {
            return Instance;
        }

        public string RunCmd(string command)
        {
            return RunCmd(new List<string> {command});
        }
        
        public string RunCmd(List<string> commands)
        {
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
            cmdProcess.ErrorDataReceived += (sender, e) => output += e.Data + "\n";
            cmdProcess.OutputDataReceived += (sender, e) => output += e.Data + "\n";
            cmdProcess.EnableRaisingEvents = true;
            
            cmdProcess.Start();
            cmdProcess.BeginOutputReadLine();
            cmdProcess.BeginErrorReadLine();

            commands.ForEach(command => cmdProcess.StandardInput.WriteLine(command));
            cmdProcess.StandardInput.WriteLine("exit");
            cmdProcess.WaitForExit();

            return output;
        }

        public string RunPsExec(Batch batch)
        {
            var username = "";
            var password = "";
            var command =
                $"psexec {batch.Server} -u {username} -p {password} {batch.WorkingDir} {batch.BatchExe} {batch.BatchParams}";

            return RunCmd(command);
        }

        public string Ping(string ip)
        {
            var commands = new List<string> {$"ping {ip}"};
            return RunCmd(commands);
        }
        
    }
}