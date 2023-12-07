function doGet(e) {
    var cache = CacheService.getScriptCache();
    var cacheKey = 'sheetData';
    var cached = cache.get(cacheKey);

    if (cached != null) {
        return ContentService.createTextOutput(cached)
            .setMimeType(ContentService.MimeType.JSON);
    } else {
        var sheets = SpreadsheetApp.getActiveSpreadsheet();
        var result = {
            "Pemateri": getSheetData(sheets.getSheetByName("Pemateri")),
            "ContactPerson": getSheetData(sheets.getSheetByName("Contact Person")),
            "Kajian": getKajianData(sheets.getSheetByName("Kajian"))
        };
        var resultString = JSON.stringify(result);
        cache.put(cacheKey, resultString, 21600); // Cache untuk 6 jam
        return ContentService.createTextOutput(resultString)
            .setMimeType(ContentService.MimeType.JSON);
    }
}

function getSheetData(sheet) {
    var rows = sheet.getDataRange().getValues();
    var headers = rows.shift();
    return rows.map(function (row) {
        var obj = {};
        headers.forEach(function (header, i) {
            obj[header] = row[i];
        });
        return obj;
    });
}

function getKajianData(sheet) {
    var kajianData = getSheetData(sheet);
    Logger.log("Kajian Data: " + JSON.stringify(kajianData));

    return kajianData.map(function (kajian) {
        kajian.alamat = {
            jalan: kajian.jalan,
            kabupaten: kajian.kabupaten,
            provinsi: kajian.provinsi,
            kodepos: kajian.kodepos
        };

        delete kajian.jalan;
        delete kajian.kabupaten;
        delete kajian.provinsi;
        delete kajian.kodepos;
        if (kajian['kategoriIlmu']) kajian['kategoriIlmu'] = kajian['kategoriIlmu'].split(',');

        kajian.pemateri = getPemateriById(kajian["ID"]);
        kajian.contactPerson = getContactPersonById(kajian["ID"]);

        Logger.log("Pemateri found: " + JSON.stringify(kajian.pemateri));
        Logger.log("Contact Person found: " + JSON.stringify(kajian.contactPerson));

        return kajian;
    });
}
