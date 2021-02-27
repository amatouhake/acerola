@echo off

set node=node-v14.15.3-win-x64
set Path=%Path%;%cd%/%node%
set NODE_PATH=%cd%/%node%/node_modules

if not exist %node% (
    bitsadmin /transfer node https://nodejs.org/dist/v14.15.3/%node%.zip %cd%/%node%.zip
    powershell expand-archive -Path %cd%/%node%.zip -DestinationPath %cd%
    del %node%.zip
)

cd acerola
cmd /k