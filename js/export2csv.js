// This js file is used to output the csv file that the lottery game outputs.
// Which includes the first, second, third, fourth prize, and the luck boss, 
// the special lucky star and the lucky actor.
// 
// The file downloading trigger function is needed to choose 

function exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                // link.click();   // We don't want to click the link automatically
                // document.body.removeChild(link);  // Same as above
            }
        }
    }
  
// This module can be used in the Result output page

// Below is the example code    
/*
exportToCsv('export.csv', [
	['name','description'],	
  ['david','123'],
  ['jona','""'],
  ['a','b'],

])

*/

// https://jsfiddle.net/jossef/m3rrLzk0/