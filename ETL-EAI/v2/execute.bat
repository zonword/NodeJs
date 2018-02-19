@echo off

set Magasin=%1
set Fichier=%2
set Destination=%3
set Origine=%4

start cmd /k "sqlplus -S MAG%Magasin%/CONFIDENTIEL@MCONFIDENTIEL @%Fichier% && TIMEOUT 5 && move /y %Origine% %Destination%\ && exit"
