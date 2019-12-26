    (function(){

        // Function:     This function inputs an object, and delete its
        //               last property and returns the object
        // Usage:        Declare the function(recommended in the front)
        //               FinalObject = deleteObjectLastProperty(OriginalObject)
        // Dependencies: No dependencies
        var deleteObjectLastProperty = function(obj){
            if(typeof(obj) === "object"){
                let query = Object.keys(obj);
                let lastKey = query[query.length-1];
                delete obj[lastKey];
                return obj;
            }
            else{
                console.log("ERROR: Wrong argument input");
            }
        }


        // Contents:
        var choosedAct = JSON.parse(localStorage.getItem('choosedAct')) || {};
        var choosedAll = JSON.parse(localStorage.getItem('choosedAll')) || {};
        var choosedLuk = JSON.parse(localStorage.getItem('choosesdLuk'))|| {};

        // Function:
        // API guide:
        var speed = function(){
            return [0.1 * Math.random() + 0.01, -(0.1 * Math.random() + 0.01)];
        };

        // Function:
        // API guide:
        var toggleFullScreen = function() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
              if (document.exitFullscreen) {
                document.exitFullscreen(); 
              }
            }
        };

        // Function:
        // API guide:
        var getKey = function(item){
            return item.name + '-' + item.phone;  
        };
        
        // Function:    This method works with tagcanvas.js, check tagcanvas documentation to
        //              figure out how it works. 
        //              This method uses storage object 'member' in member.js to serve as a 
        //              query library for it to identify the 'choosed_candidate'.
        //              If the candidate is choosed, the tag uses  
        // Usage:       Invoke this using canvas.createHTML(); to create the sphere
        // API guide:
        var createHTML = function(){ 
            var html = [ '<ul>' ];
            member.forEach(function(item, index){ 
                item.index = index;
                var key = getKey(item); 
                var color = (choosedAct[key]||choosedAll[key]||choosedLuk[key]) ? 'gold' : 'red';
                html.push(`<li><a href="#" style="color: ${color}; font-family: canvasFont1;">${item.name}</a></li>`);
            }); 
            html.push('</ul>');
            return html.join('');
        };

        // Function:
        // Usage:
        // Modification guide:
        var initializeButton = function(){
            var qury = document.getElementsByClassName("pure-button");
            for(q in qury){
                switch(qury[q].innerText){
                    case "(✿◠‿◠)":
                        qury[q].id = "test";
                        break;
                    case "四等奖":
                        qury[q].id = "四等奖";
                        break;
                    case "三等奖":
                        qury[q].id = "三等奖";
                        break;
                    case "二等奖":
                        qury[q].id = "二等奖";
                        break;
                    case "一等奖":
                        qury[q].id = "一等奖";
                        break;
                    case "幸运演员奖":
                        qury[q].id = "幸运演员奖";
                        break;
                    case "特等奖":
                        qury[q].id = "特等奖";
                        break;
                    case "老板奖":
                        qury[q].id = "老板奖";
                        break;
                    case "幸运之星奖":
                        qury[q].id = "幸运之星奖";
                        break;
                    default:
                        ;
                }
            }
        };


      
        // Function:
        // Usage:
        // Modification guide:
        var DisplayPhoto = function(prized_p){
            var phtml = [];
        };

        // Function: 
        // Usage:
        // Modification guide:
        var IDclick = (k) => $(`#${k}`).trigger('click');   
        var assignHotKey = function(){
            document.addEventListener("keyup", function(e) {

                 console.log(e.keyCode); // FOR TESTING
                switch(e.keyCode){
                    case 13:    // 'ENTER'
                        toggleFullScreen();
                    break;
                    case 49:    // '1'
                        IDclick("四等奖");
                    break;
                    case 50:    // '2'
                        IDclick("三等奖");
                    break;
                    case 51:    // '3'
                        IDclick("二等奖");
                    break;
                    case 52:    // '4'
                        IDclick("一等奖");
                    break;
                    case 53:    // '5'
                        IDclick("幸运演员奖");
                    break;
                    case 54:    // '6'
                        IDclick("特等奖");
                    break;
                    case 55:    // '7'
                        IDclick("老板奖");
                    break;
                    case 56:    // '8'
                        IDclick("幸运之星奖");
                    break;
                    case 32:    // 'SPACE'
                        IDclick("SndS");
                    break; 
                    case 82:    // 'R' RESET
                        IDclick("stop");
                    break;
                    case 84:    // 'T' FOR TESTING => DESTROY PHOTO
                        IDclick("test");
                    break;
                    case 68:    // 'D' FOR DOWNLOADING RESULTS
                        IDclick("button-download");
                    break;
                    case 8:
                        IDclick("undo");
                }
            }, false);
        }

        // Function:
        // Usage:
        // Modification guide:
        var createCanvas = function(){
            var canvas = document.createElement('canvas');
            canvas.id = 'myCanvas';
            canvas.style.position = 'absolute';
            canvas.style.left = '-14%';
            canvas.style.top = '24%';
            canvas.width = 1500; // document.body.offsetWidth:1920
            canvas.height = 700; // document.body.offsetHeight:979
            document.getElementById('main').appendChild(canvas);
            return canvas;                           
        };

        // Function:
        // API guide: 
        var lottery = function(count){

            var ret;
            var color = 'gold';
            var status  = localStorage.flag;
            var list = canvas.getElementsByTagName('a');

            let container = status == "幸运演员奖" ? artist 
                          : status == "幸运之星奖" ? lucky
                          : member;
            let containerChosen = status == "幸运演员奖" ? choosedAct 
                                : status == "幸运之星奖" ? choosedLuk
                                : choosedAll;

            ret = container
            .filter(function(m, index){                 // Add index to each one(last)
                m.index = index;
                return !containerChosen[getKey(m)];
            })
            .map(function(m){                           // Assign(add) a score 
                return Object.assign({                  // into each element of 
                  score: Math.random()                  // the Object(first)
                }, m);
            })
            .sort(function(a, b){                       // Sort by score attribute
                return a.score - b.score;   
            })                              
            .slice(0, count)                            // Select ${count} numbers 
            .map(function(m){                           // of candidates and log on
              containerChosen[getKey(m)] = 1;
              list[m.index].style.color = color;
              return `${m.name} <br> <br> <br> ${m.Num} <br> <br> <br> ${m.Dept}`; 
            });
            
            console.log(container); 

            // This code can be simplified 
            localStorage.setItem('choosedAct', JSON.stringify(choosedAct));
            localStorage.setItem('choosedAll', JSON.stringify(choosedAll));
            localStorage.setItem('choosedLuk', JSON.stringify(choosedLuk));
            
            return ret;

        };

        // Function:
        // API guide:
        var logData = function(lottered){
            var status = localStorage.flag;
            if(!localStorage.getItem(localStorage.flag))
            {localStorage.setItem(status, JSON.stringify(lottered));}
            else{
                let existing = JSON.parse(localStorage.getItem(status));
                existing = existing.concat(lottered);
                localStorage.setItem(status, JSON.stringify(existing));
            }
        }

        // Function:
        // API guide:
        var processData = function(data){

            let rawData = data;
            let newData = [];
            if(rawData){
                for(let i in rawData){
                    newData[i] = rawData[i]
                    .replace(/<br>|\s*\([^)]*\)/g,"")
                    .split(/\s/g)
                    .filter((el) => el!="");
                }
            }
            return newData;
        }

        // Function:
        // API guide:
        var addRow = function(data){
            var table = document.getElementById("TableBody");
            for(i in data){
                let NAME = data[i][0];
                let NUMBER = data[i][1];
                let DEPT = data[i][2];
                var rowCount = table.rows.length;
                var row = table.insertRow(rowCount);
                row.id = `${localStorage.flag}-tb`;
                row.insertCell(0).innerHTML = NAME;
                row.insertCell(1).innerHTML = NUMBER;
                row.insertCell(2).innerHTML = DEPT;
            }
        }

        var deleteRow= function(index){
            var table = document.getElementById("TableBody");
            table.deleteRow(index);
        }


        // Function:
        // API guide:
        var ClearTable = function(idName){
            var table = document.getElementById("TableBody");
            for(let i in table.rows){$(`#${idName}`).remove();}
        }


        var UpdateTable = function(data,type){
            var table = document.getElementById("TableBody");
            let status = `${localStorage.flag}-tb`;
            if(type === "preselection"){
                ClearTable(status);
            }
            else if(type === "postselection"){
                addRow(data);
            }
            else if(type === "toggle"){
                addRow(data);
            }
            else if(type === "undo"){
                if(table.rows.length > 1){
                deleteRow(table.rows.length-1);
                }
                else{
                    console.log("WARNING: CANNOT undo empty table");
                }
            }
            else{
                console.log("something went wrong");
            }
        }



        // Function:
        // API guide:
        var canvas = createCanvas(); 

        // Function:
        // API guide:
        var exportToCsv = function(filename, rows) {
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
                    link.click();   // We don't want to click the link automatically
                    document.body.removeChild(link);  // Same as above
                }
            }
        };
    
        var initializeDownload = function(){
            let locals = window.localStorage;
            for(let i in locals){
                if(/[\u3400-\u9F8F]/g.test(i))
                {
                    let tmp = JSON.parse(localStorage.getItem(i));
                    let tmp_s = i.toString();
                    vm.prz_results.push([].concat(tmp_s,tmp));
                    console.log(vm.prz_results);
                }
            }
        };

        var UpdateDisplay = function(status,type){
            display = $(".Category");
            if(type === "initialize"){
            display.html = status ? status : "幸运大抽奖";
            display.css({
                position: "absolute",
                display:  "block",
                right:    "45%",
                top:      "-1350%",
                "background-color": "none",
                color:    "gold",
                margin:   "1px 1px 1px 1px",
                border:   "1px",
                "font-family": "canvasFont1",
                "font-size": "50px"
            })
            }
            else if(type === "change"){
                console.log("changed");
            }
            else{
                console.log("something went wrong");
            }
        };

        var makePicturePath = function(processedData){
            // todo: input<--processedData
            // input: []
            // output: <img ... [name].jpg...>
        
        }


        // FUTURE WORK: Change location rules to percentage to make the page responsive
        var CreateToggleJumpScare = function(ret){
            $('#result').css({
                position: "absolute",
                left    : "32%",
                top     : "30%",
                display : "block",
                margin  : "0px 0px 0px 0px",
                height  : "600px",
                width   : "800px"
           });
           $('#result').append("<div class='cat'></div");
            $('.cat').append('<img id="fuck" src="./img/cat.jpg" style="width: 100%"  />');
            $('.cat').append('<div class="container"></div>');
            $('.cat').css({
                width    : "600px",
                height   : "650px",
                "background-color" : "red",
                "box-shadow" : "0 4px 8px 0 rgba(255,215,0,1), 0 6px 20px 0 rgba(255,215,0,1)",
                "margin" : "0px 0px 0px 0px"
            });
                $('.container').append(`<br><p id="shit" style="line-height:1.6">${ret}</p>`);
                $('.container').css({
                    "text-align" : "center",
                    padding : "0px 0px",
                    margin  : "0px 0px 0px 0px",
                    "font-family" : "canvasFont1"
                });
                    $('#shit').css({
                        "margin-top"    : "30px",
                        "font-size"     : "50px",
                        color           : "gold"
                    })

        }

        var ChangeBlur = function(type){
            if(type === "on"){
                $('#main').addClass('mask');
                $('.TopBanner').addClass('mask');
                $('.ResultsDisplay').addClass('mask');
                $('.Category').addClass('mask');
                // Can change table diplay to none if not responsive
            }
            else if(type === "off"){
                $('#main').removeClass('mask');
                $('.TopBanner').removeClass('mask');
                $('.ResultsDisplay').removeClass('mask');
                $('.Category').removeClass('mask');
            }
        }


        var localStorageUndo = function(){
            let pointer = localStorage.flag;
            let pointed = JSON.parse(localStorage.getItem(pointer));
            var chosenContainer = "";
            var updatedContainer = {};

            pointed.pop();
            localStorage.setItem(pointer, JSON.stringify(pointed));

            if(pointer === "幸运演员奖"){
                let ActorContainer = JSON.parse(localStorage.getItem("choosedAct"));
                updatedContainer = deleteObjectLastProperty(ActorContainer);
                chosenContainer = "choosedAct";
            }
            else if(pointer === "幸运之星奖"){
                let luckyContainer = JSON.parse(localStorage.getItem("choosedLuk"));
                updatedContainer = deleteObjectLastProperty(luckyContainer);
                chosenContainer = "choosedLuk";
            }
            else if(pointer){
                let AllContainer = JSON.parse(localStorage.getItem("choosedAll"));
                updatedContainer = deleteObjectLastProperty(AllContainer);
                chosenContainer = "choosedAll";
            }
            else{
                console.log("ERROR when initiating localStorageUndo: pointer is undefined");
            }
            localStorage.setItem(chosenContainer, JSON.stringify(updatedContainer));
        }

        var undoLastChange = function(){
            localStorageUndo();
            UpdateTable("","undo");
        }

        var undoSelectedCandidate = function(){
            ;   // todo
        }

        var EnterDebugMode = function(){
            ;   // Make the buttons and delete selection at the table visible
        }

        var ExitDebugMode = function(){
            ;   // Make the buttons and delete selection at the table invisible
        }

        var batchToggleVisibilityById = function(id,type){
            if(type === "hide"){
            $(`#${id}`).hide();
            }
            else if(type === "show"){
            $(`#${id}`).show();
            }
            else{
                console.log(`ERROR in toggleVisibilityById(${id},${type}: Wrong input`);
            }
        }


        new Vue({
            el: '#tools',
            data: {
                selected: 1,
                c_priz: "",
                running: false,
                showing: false,
                btns: [1],
                priz: ["四等奖","三等奖","二等奖","一等奖","幸运演员奖","特等奖",
                       "老板奖","幸运之星奖"],
                count: ["0","1","2","3","4","5","6"],
                results: [],
                prz_results : []
            },
            mounted () {

                vm = this;  // Global on purpose, be careful

                // Function:
                // Modification guide:
                canvas.innerHTML = createHTML();
                TagCanvas.Start('myCanvas', '', {
                    textFont : "canvasFont1",
                    textColour: null,
                    initial: speed(),
                    
                    radiusX: 0.83,
                    radiusY: 0.83,
                    radiusZ: 0.83,

                    dragControl: 1,
                    textHeight: 35, // sphere-font-size
                    weight: true,
                    weightMode: 'size',
                    weightSize: 100.0,
                    weightSizeMax: 100.0,
                    weightSizeMin: 99.9
                });
        
                let status = localStorage.flag;
                UpdateDisplay(status,"initialize");
                initializeButton();
                assignHotKey();

            },

            methods: {
                // Function:
                // Modification guide:
                reset: function(){
                    if(confirm('确定要重置么？所有之前的抽奖历史将被清除！')){
                        localStorage.clear();
                        UpdateTable([],"preselection");
                        location.reload(true);
                    }
                },
                
                // Function:
                // Modification guide:
                onClick: function(num){
                    $('#result').css('display', 'none');
                    $('#result').empty();
                    ChangeBlur("off");
                    this.selected = num;
                },

                // Function:
                // Modification guide:
                toggle: function(){

                    if(this.running){

                        TagCanvas.SetSpeed('myCanvas', speed());
                        var ret = lottery(this.selected); 
                        if (!ret.length) {+
                            $('#result').css('display', 'block').html('<span>已抽完</span>');
                            return
                        }
                        TagCanvas.Reload('myCanvas');
                        setTimeout(function(){
                            let processedData = processData(ret);
                            logData(processedData);
                            UpdateTable(processedData,"toggle");
                            // CreateToggleJumpScare(ret);
                            CreateToggleJumpScare(processedData);
                            ChangeBlur("on");
                           // FONT PERFORMANCE ISSUE:
                           // https://www.freecodecamp.org/news/web-fonts-in-2018-f191a48367e8/
                     
                     
                        }, 10);
                    } else {
                        TagCanvas.SetSpeed('myCanvas', [5, 1]);
                    }
                    this.running = !this.running;
                },

                // Function:
                // Modification guide:
                judge: function(pz){
                    // Remove all rows from the table
                    UpdateTable([],"preselection");
                    if(!localStorage.flag) localStorage.flag = "";
                    localStorage.flag = pz; 
                    let newCat = localStorage.getItem('flag');
                    let ChangedData = localStorage.getItem(newCat);
                    if(ChangedData){
                        UpdateTable(JSON.parse(ChangedData),"postselection");
                    }
                    else{
                        console.log("Warning: No data available");
                    }
                    this.c_priz = pz === "幸运之星奖" ? "Lucky Star"
                                : pz === "老板奖" ? "Lucky Boss"
                                : pz;
                    console.log(this.c_priz);
                },

                // Function:
                // Modification guide:
                undo: function(){
                    undoLastChange();  
                },

                // Function:
                // Modification guide:
                output: function(){
                    initializeDownload();
                    exportToCsv("SLEC_results.csv",this.prz_results);
                }

            }
        });
    })();


// Start Vue debugging mode, comment out if you don't want to debug
// Vue.config.devtools = true;