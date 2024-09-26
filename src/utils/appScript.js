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
      /*       "Pemateri": getSheetData(sheets.getSheetByName("Pemateri")),
       *//*       "ContactPerson": getSheetData(sheets.getSheetByName("Contact Person")),
       */      "Kajian": getKajianData(sheets.getSheetByName("Kajian")),
      /*       "Alamat": getSheetData(sheets.getSheetByName("Alamat")),
       */    };
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
    kajian.alamat = getAlamat(kajian["ID"]);
    kajian.pemateri = getPemateriById(kajian["ID"]);
    kajian.contactPerson = getContactPersonById(kajian["ID"]);

    Logger.log("Pemateri found: " + JSON.stringify(kajian.pemateri));
    Logger.log("Contact Person found: " + JSON.stringify(kajian.contactPerson));

    return kajian;
  });
}

function getPemateriById(pemateriId) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Pemateri");
  var rows = sheet.getDataRange().getValues();
  var headers = rows.shift();

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    if (String(row[0]) === String(pemateriId)) {
      var pemateri = {};
      headers.forEach(function (header, index) {
        pemateri[header] = row[index];
      });
      return pemateri;
    }
  }
  return null;
}

function getContactPersonById(contactPersonId) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Contact Person");
  var rows = sheet.getDataRange().getValues();
  var headers = rows.shift();

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    if (String(row[0]) === String(contactPersonId)) {
      var contactPerson = {};
      headers.forEach(function (header, index) {
        contactPerson[header] = row[index];
      });
      return contactPerson;
    }
  }
  return null;
}


function getAlamat(alamatId) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Alamat");
  var rows = sheet.getDataRange().getValues();
  var headers = rows.shift();

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    if (String(row[0]) === String(alamatId)) {
      var contactPerson = {};
      headers.forEach(function (header, index) {
        contactPerson[header] = row[index];
      });
      return contactPerson;
    }
  }
  return null;
}

function safeGetSheetByName(name) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sheet) {
    throw new Error('Sheet with name "' + name + '" not found.');
  }
  return sheet;
}