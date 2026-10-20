Set oShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
desktopPath = oShell.SpecialFolders("Desktop")
startMenuPath = oShell.SpecialFolders("Programs")
iconPath = scriptDir & "\assets\ivtv.ico"

' 1. Delete all old standalone shortcuts and legacy variations
Dim oldShortcuts, scName
oldShortcuts = Array( _
    desktopPath & "\IV - TV (App Mode).lnk", _
    desktopPath & "\IVTV.lnk", _
    desktopPath & "\IV - TV.lnk", _
    desktopPath & "\Stop IV - TV.lnk" _
)

For Each scName In oldShortcuts
    If fso.FileExists(scName) Then
        On Error Resume Next
        fso.DeleteFile scName, True
        On Error GoTo 0
    End If
Next

' 2. Create the brand new primary Standalone App shortcut on Desktop: "IV - TV.lnk"
Set scMain = oShell.CreateShortcut(desktopPath & "\IV - TV.lnk")
scMain.TargetPath = "wscript.exe"
scMain.Arguments = """" & scriptDir & "\launch.vbs"""
scMain.WorkingDirectory = scriptDir
If fso.FileExists(iconPath) Then
    scMain.IconLocation = iconPath & ", 0"
End If
scMain.Description = "IVTV - Cinematic UK Freeview & Sky TV Player (Standalone Desktop App)"
scMain.Save

' 3. Create the Stop Server shortcut on Desktop: "Stop IV - TV.lnk"
Set scStop = oShell.CreateShortcut(desktopPath & "\Stop IV - TV.lnk")
scStop.TargetPath = "wscript.exe"
scStop.Arguments = """" & scriptDir & "\stop.vbs"""
scStop.WorkingDirectory = scriptDir
scStop.IconLocation = "shell32.dll, 27" ' Red power stop icon
scStop.Description = "Stop IV TV Background Server"
scStop.Save

' 4. Register in Windows Start Menu Programs
If fso.FolderExists(startMenuPath) Then
    Set scStart = oShell.CreateShortcut(startMenuPath & "\IV - TV.lnk")
    scStart.TargetPath = "wscript.exe"
    scStart.Arguments = """" & scriptDir & "\launch.vbs"""
    scStart.WorkingDirectory = scriptDir
    If fso.FileExists(iconPath) Then
        scStart.IconLocation = iconPath & ", 0"
    End If
    scStart.Description = "IVTV - Cinematic UK Freeview & Sky TV Player"
    scStart.Save
End If

WScript.Echo "========================================================"
WScript.Echo "  IVTV Standalone Desktop App Shortcuts Updated!"
WScript.Echo "========================================================"
WScript.Echo "Desktop App Shortcut:   " & desktopPath & "\IV - TV.lnk"
WScript.Echo "Stop Server Shortcut:  " & desktopPath & "\Stop IV - TV.lnk"
If fso.FolderExists(startMenuPath) Then
    WScript.Echo "Start Menu Shortcut:   " & startMenuPath & "\IV - TV.lnk"
End If
WScript.Echo "========================================================"
