@echo off
REM RiceMillOS Quick Command Menu

echo.
echo === RiceMillOS Command Menu ===
echo.
echo Choose an option:
echo 1. Start Development (Native)
echo 2. Start Development (Docker)
echo 3. Start Supabase Local
echo 4. Check Supabase Status
echo 5. Deploy to Remote Supabase
echo 6. Deploy to Netlify Production
echo 7. Build Project
echo 8. Run Tests
echo 9. View Docker Logs
echo 0. Exit
echo.

set /p choice="Enter your choice (0-9): "

if %choice%==1 (
    echo Starting local development...
    npm run dev
) else if %choice%==2 (
    echo Starting Docker development...
    npm run docker:dev
) else if %choice%==3 (
    echo Starting Supabase local...
    npm run supabase:start
) else if %choice%==4 (
    echo Checking Supabase status...
    npm run supabase:status
) else if %choice%==5 (
    echo Deploying to remote Supabase...
    npm run supabase:deploy
) else if %choice%==6 (
    echo Deploying to Netlify production...
    netlify deploy --prod --build
) else if %choice%==7 (
    echo Building project...
    npm run build
) else if %choice%==8 (
    echo Running tests...
    npm run test
) else if %choice%==9 (
    echo Viewing Docker logs...
    npm run docker:dev:logs
) else if %choice%==0 (
    echo Goodbye!
    exit /b
) else (
    echo Invalid choice. Please try again.
)

echo.
pause