Set oShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)

' Check if port 5173 is already in use
Set oExec = oShell.Exec("powershell -NoProfile -Command ""[bool](Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue)""")
output = Trim(oExec.StdOut.ReadAll())

If InStr(output, "True") = 0 Then
    ' Start server silently using pythonw
    oShell.CurrentDirectory = scriptDir
    oShell.Run "pythonw.exe """ & scriptDir & "\server.py""", 0, False
    WScript.Sleep 1000
End If

' Open default browser to the web app
oShell.Run "http://localhost:5173"
