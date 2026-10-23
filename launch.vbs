Set oShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
oShell.CurrentDirectory = scriptDir

' 1. Locate pythonw executable for silent background operation
Dim pythonExe
pythonExe = "pythonw.exe"
If fso.FileExists("C:\Python313\pythonw.exe") Then
    pythonExe = "C:\Python313\pythonw.exe"
ElseIf fso.FileExists("C:\Python312\pythonw.exe") Then
    pythonExe = "C:\Python312\pythonw.exe"
ElseIf fso.FileExists("C:\Python311\pythonw.exe") Then
    pythonExe = "C:\Python311\pythonw.exe"
End If

' 2. Ultra-fast native HTTP check (under 15ms) to determine if server is active
Function IsServerRunning()
    IsServerRunning = False
    On Error Resume Next
    Dim xmlHttp
    Set xmlHttp = CreateObject("MSXML2.ServerXMLHTTP.6.0")
    xmlHttp.open "GET", "http://127.0.0.1:5173/index.html", False
    xmlHttp.setTimeouts 400, 400, 400, 400
    xmlHttp.send
    If Err.Number = 0 Then
        If xmlHttp.status = 200 Or xmlHttp.status = 304 Then
            IsServerRunning = True
        End If
    End If
    Set xmlHttp = Nothing
    Err.Clear
    On Error GoTo 0
End Function

If Not IsServerRunning() Then
    ' Start server in background without flashing any command prompt window
    Dim cmd
    cmd = """" & pythonExe & """ """ & scriptDir & "\server.py"""
    oShell.Run cmd, 0, False

    ' Wait up to 5 seconds for server to initialize
    Dim attempts, ready
    attempts = 0
    ready = False
    Do While attempts < 15 And Not ready
        WScript.Sleep 300
        attempts = attempts + 1
        If IsServerRunning() Then
            ready = True
            Exit Do
        End If
    Loop

    If Not ready Then
        MsgBox "Failed to start IV TV server on http://localhost:5173." & vbCrLf & _
               "Please check server.log in the IV - TV folder for details.", vbCritical, "IV TV Error"
        WScript.Quit 1
    End If
End If

' 3. Detect Chrome or Edge for standalone desktop app window
Dim chromePath, edgePath, browserExe, browserArgs, browserLaunched
browserLaunched = False

chromePath = ""
If fso.FileExists("C:\Program Files\Google\Chrome\Application\chrome.exe") Then
    chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
ElseIf fso.FileExists("C:\Program Files (x86)\Google\Chrome\Application\chrome.exe") Then
    chromePath = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
ElseIf fso.FileExists(oShell.ExpandEnvironmentStrings("%LOCALAPPDATA%") & "\Google\Chrome\Application\chrome.exe") Then
    chromePath = oShell.ExpandEnvironmentStrings("%LOCALAPPDATA%") & "\Google\Chrome\Application\chrome.exe"
End If

edgePath = ""
If fso.FileExists("C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe") Then
    edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
ElseIf fso.FileExists("C:\Program Files\Microsoft\Edge\Application\msedge.exe") Then
    edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
End If

' By default, launch as standalone desktop app window unless /browser is specified
Dim useBrowserOnly
useBrowserOnly = False
If WScript.Arguments.Count > 0 Then
    If LCase(WScript.Arguments(0)) = "/browser" Or LCase(WScript.Arguments(0)) = "--browser" Then
        useBrowserOnly = True
    End If
End If

If Not useBrowserOnly Then
    If chromePath <> "" Then
        browserExe = chromePath
    ElseIf edgePath <> "" Then
        browserExe = edgePath
    End If

    If browserExe <> "" Then
        browserArgs = "--app=http://127.0.0.1:5173/?v=70 --start-maximized --autoplay-policy=no-user-gesture-required --disable-features=Translate"
        oShell.Run """" & browserExe & """ " & browserArgs, 1, False
        browserLaunched = True
    End If
End If

If Not browserLaunched Then
    oShell.Run "http://127.0.0.1:5173/?v=70"
End If
