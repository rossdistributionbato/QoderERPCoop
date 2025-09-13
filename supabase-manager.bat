@echo off
REM RiceMillOS Supabase Quick Commands

echo.
echo === RiceMillOS Supabase Management ===
echo.
echo Choose an option:
echo 1. Start Local Supabase
echo 2. Stop Local Supabase  
echo 3. Check Status
echo 4. Open Studio
echo 5. Deploy to Remote (requires login)
echo 6. Generate TypeScript Types
echo 7. Exit
echo.

set /p choice="Enter your choice (1-7): "

if %choice%==1 (
    echo Starting local Supabase...
    .\supabase.exe start
) else if %choice%==2 (
    echo Stopping local Supabase...
    .\supabase.exe stop
) else if %choice%==3 (
    echo Checking status...
    .\supabase.exe status
) else if %choice%==4 (
    echo Opening Studio...
    .\supabase.exe studio
) else if %choice%==5 (
    echo Deploying to remote...
    .\supabase.exe db push --linked
) else if %choice%==6 (
    echo Generating TypeScript types...
    if not exist "packages\shared\src\types" mkdir "packages\shared\src\types"
    .\supabase.exe gen types typescript --local > packages\shared\src\types\supabase.ts
    echo Types generated at: packages\shared\src\types\supabase.ts
) else if %choice%==7 (
    echo Goodbye!
    exit /b
) else (
    echo Invalid choice. Please try again.
)

echo.
pause