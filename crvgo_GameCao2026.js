function ungroupOnlyToday() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Game reward tracking");

    // 1. Get today's date formatted to match your Row 3 (YYYY-MM-DD)
    // Based on your image: 2026-01-30
    const todayStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");

    const dateRow = 3;
    const lastColumn = sheet.getLastColumn();
    // Get display values to ensure text matching works
    const dateValues = sheet.getRange(dateRow, 1, 1, lastColumn).getDisplayValues()[0];

    let foundMatch = false;

    // 2. Loop through the row to find today's specific column
    for (let i = 0; i < dateValues.length; i++) {
        if (dateValues[i] === todayStr) {
            const colIndex = i + 1;

            try {
                // First, ensure the columns are visible/expanded so the ungrouping can apply
                sheet.showColumns(colIndex);

                // Remove the grouping for just this column
                // This removes the [+] or [-] bracket logic for this specific index
                sheet.getRange(dateRow, colIndex).shiftColumnGroupDepth(-1);

                console.log("Ungrouped today's column: " + colIndex);
                foundMatch = true;
            } catch (e) {
                console.log("Column " + colIndex + " was already ungrouped or error: " + e.message);
            }
        }
    }

    // if (!foundMatch) {
    //   SpreadsheetApp.getUi().alert("Could not find any columns matching today's date: " + todayStr);
    // } else {
    //   SpreadsheetApp.getUi().alert("Successfully ungrouped columns for " + todayStr);
    // }
}