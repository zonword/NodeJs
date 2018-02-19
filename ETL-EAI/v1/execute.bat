@echo off

set PARAM1=%1
set PARAM2=%2

start cmd /k "sqlplus -S mon%PARAM1%/motdepasse@host @%PARAM2% && exit"
