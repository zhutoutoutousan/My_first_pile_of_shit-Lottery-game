    // Training 1: How does 'choosed' work? What's the repercussions if you just
    //             randomly fiddle around changing the overall functionality?
    (function(){
        // This function needs to redefine another 'choosed' variable like 
        // var choosed_act = JSON.parse
        var choosed = JSON.parse(localStorage.getItem('choosed')) || {};
        // var choosedAct = JSON.parse(localStorage.getItem('choosedAct')) || {};

        // You can press F12 button in the web page to see the choosed candidates
        console.log(choosed);
        
        var speed = function(){
            return [0.1 * Math.random() + 0.01, -(0.1 * Math.random() + 0.01)];
        };

         // This is where you can actually edit the content to be shown in the giant sphere.
         // Try think about "EDITING THE FONT STYLE IN THE SPHERE HERE"
         // Input the 'member'(forEach() method to each object maybe), get the 'name' and 'phone' 's value.
        var getKey = function(item){
            return item.name + '-' + item.phone;  
        };
        // The following function affects the color of the font in the giant 'cloud' sphere, if the candicate is
        // 'choosed' then returns yellow color, if not then white.
        // The questions remains the hashtag href connection issues, why is there a hashtag instead of a reference?
        var createHTML = function(){ // This function returns the html command creating un-ordered list of member info
            var html = [ '<ul>' ];
            member.forEach(function(item, index){ // member has its embedded 'index' attribute indicating its index.
                item.index = index;
                var key = getKey(item); 
                var color = choosed[key] ? 'lime' : 'red';
                // TAG FONT EDIT
                // var font = ?  Edit this code to change the font style in html code
                html.push('<li><a href="#" style="color: ' + color + ';">' + item.name + '</a></li>');
            });
            html.push('</ul>');
            return html.join('');
        };


        var lottery = function(count){
            var list = canvas.getElementsByTagName('a');
            var color = 'lime';

            // The ret returns the result of random process of choosing candidates.
            // No need to edit this but the interface
            // The input argument is 'count', which is a number that indicates the number of people choosed.
            // The same as the input button

            // In order to load the different sets from the artist.js or member.js based on
            // the selection of the buttons, we can either make a judgement mechanism to for
            // the ret to choose, or we can just create a ret_art calling method on the rest of
            // the artists
            // However, if you choose the latter, it would be wordy and unneccessary to write this
            // chained method all over again, hence declaring a function is mandatory.
        
            /*
            var ret = member => 
            */

            // The way to encapsulate this method chain is required


            
            // CURRENT PROBLEMS:    
            // 1.The ret only reads the first expression in the if statment below.
            //
            // POTENTIAL PROBLEMS: OVERLAP OF THE choosed set between the artist and overall members.
            
            var ret;

            if(!localStorage.flag == "幸运演员奖") {
                ret = artist
                .filter(function(m, index){
                    m.index = index;
                    return !choosed[getKey(m)];
                }) // Define a method that just extracts the key of the member object
                .map(function(m){
                    return Object.assign({
                      score: Math.random()
                    }, m);
                })
                .sort(function(a, b){
                    return a.score - b.score;
                })
                .slice(0, count)
                .map(function(m){
                  choosed[getKey(m)] = 1;
                  list[m.index].style.color = color;
                  return m.name + '</br>' + m.phone; 
                });
            }
            else{
            ret = member
                .filter(function(m, index){
                    m.index = index;
                    return !choosed[getKey(m)];
                }) // Define a method that just extracts the key of the member object
                .map(function(m){
                    return Object.assign({
                      score: Math.random()
                    }, m);
                })
                .sort(function(a, b){
                    return a.score - b.score;
                })
                .slice(0, count)
                .map(function(m){
                  choosed[getKey(m)] = 1;
                  list[m.index].style.color = color;
                  return m.name + '</br>' + m.phone; 
                });
            }


            // There is something wrong about this code: The ret variable only reads the first element of the 
            //      ternary operator 
            //    
            // var ret = (!localStorage.flag == "幸运演员奖") ? (artist
            //     .filter(function(m, index){
            //         m.index = index;
            //         return !choosed[getKey(m)];
            //     }) // Define a method that just extracts the key of the member object
            //     .map(function(m){
            //         return Object.assign({
            //           score: Math.random()
            //         }, m);
            //     })
            //     .sort(function(a, b){
            //         return a.score - b.score;
            //     })
            //     .slice(0, count)
            //     .map(function(m){
            //       choosed[getKey(m)] = 1;
            //       list[m.index].style.color = color;
            //       return m.name + '</br>' + m.phone; 
            //     })):(member
            //     .filter(function(m, index){
            //         m.index = index;
            //         return !choosed[getKey(m)];
            //     }) // Define a method that just extracts the key of the member object
            //     .map(function(m){
            //         return Object.assign({
            //           score: Math.random()
            //         }, m);
            //     })
            //     .sort(function(a, b){
            //         return a.score - b.score;
            //     })
            //     .slice(0, count)
            //     .map(function(m){
            //       choosed[getKey(m)] = 1;
            //       list[m.index].style.color = color;
            //       return m.name + '</br>' + m.phone; 
            //     }))
                

            // This code is executed immediately after the lottery process complete so that 
            // another lottering process don't conflict with the previous one
            localStorage.setItem('choosed', JSON.stringify(choosed));


            return ret;



        };

        // Create a <canvas> tag for drawing graphics, maybe for the instant display of results.
        var canvas = document.createElement('canvas');
        canvas.id = 'myCanvas';
        canvas.width = document.body.offsetWidth;    // This is where you can adjust TagCanvas position
        canvas.height = document.body.offsetHeight;
        document.getElementById('main').appendChild(canvas); // The main Id is at >>15 index.html

        new Vue({
            el: '#tools',
            data: {
                selected: 30, // The 'selected' is initailized to 30 but changeable by the input button
                running: false,
                btns: [
                    30, 10, 5, 2, 1
                ],
                priz: ["特等奖","一等奖","二等奖","三等奖","四等奖",
                       "掏兜奖","幸运演员奖"]
                   // 0: 特等奖 1:一等奖 2:二等奖 3：三等奖 4：四等奖 
                                         // 5：掏兜奖 6：幸运之星奖，7：幸运演员奖

                // Check out the Vue.js create multiple button set using v-for in combination

                /*

                bnts: [[[15,"四等奖"],[5,"三等奖"],[2,"二等奖],[1,"一等奖"],
                    [1,"特等奖"],[1,"掏兜奖"],[1,"幸运之星奖"]]]

                or
                
                RELATE1--bnts: [[15, 5, 2, 1, 1, 1, 1],["四等奖","三等奖","二等奖",
                    "一等奖","特等奖","掏兜奖", "幸运之星奖"]]

                */
            },
            mounted () {
                canvas.innerHTML = createHTML();
                // The next line of code is made by me
                TagCanvas.options.imageMode = null;  // No need to upload the image, not approriate
                // TagCanvas.options.weightSize = 100;
                TagCanvas.Start('myCanvas', '', {
                    textColour: null,
                    initial: speed(),
                    dragControl: 1,
                    // textHeight options alters the font size
                    textHeight: 35,
                    // The weight options of the tagcanvas is seemingly uselss
                    weight: true,
                    weightMode: 'size',
                    weightSize: 100.0,
                    weightSizeMax: 100.0,
                    weightSizeMin: 99.9
                });
            },
            methods: {
                //In here 'this' keyword refers to the 'method' object and is invoked by either of the methods
                reset: function(){
                    // Clear the local storage if you like
                    if(confirm('确定要重置么？所有之前的抽奖历史将被清除！')){
                        localStorage.clear();
                        location.reload(true);
                    }
                },
                onClick: function(num){
                    $('#result').css('display', 'none');
                    $('#main').removeClass('mask');
                    this.selected = num;
                    // This num, which by index.html >>27 called and evaluated as value(Button value) 
                    // Determines the number of candidates that is 'selected'
                },
                // The toggle method first detects the state of the 
                toggle: function(){
                    if(this.running){
                        TagCanvas.SetSpeed('myCanvas', speed());
                        var ret = lottery(this.selected); // ret returns the people choosed to get the prize
                        if (ret.length === 0) {+
                            $('#result').css('display', 'block').html('<span>已抽完</span>'); // jQuery
                            return
                        }
                        $('#result').css('display', 'block').html('<span>' + ret.join('</span><span>') + '</span>');
                        TagCanvas.Reload('myCanvas');
                        setTimeout(function(){  // Log data after 300 ms

                            // The following code shall be changed to categorize the different
                            // categorization of prizes
                            //！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
                            // RSVD: localStorage.setItem(localStorage.flag.toString(), JSON.stringify(ret));
                            var status = localStorage.flag;

                            if(localStorage.getItem(localStorage.flag) === null)
                            {localStorage.setItem(status, JSON.stringify(ret));}
                            else{
                                    let existing = JSON.parse(localStorage.getItem(status));
                                    console.log(existing);
                                    console.log(ret);
                                    existing = existing.concat(ret);
                                    console.log(existing);
                                    localStorage.setItem(status,JSON.stringify(existing));
                                  }
                            
                           // https://www.geeksforgeeks.org/how-to-add-an-object-to-an-array-in-javascript/
                           // Check this out for editing

                            $('#main').addClass('mask');   // Add blurring effect check main.css
                        }, 300); // Upload the localStorage after 300ms, 
                    } else {
                        $('#result').css('display', 'none');  // ！！ Can you modify this to make the font bigger?
                        $('#main').removeClass('mask');  // Remove the blurring effect check main.css
                        TagCanvas.SetSpeed('myCanvas', [5, 1]); // [X,Y] is the x, y axis rotation speed
                    }
                    this.running = !this.running; // Stop the toggle process
                },
                // The method below has not been tested, comment out if there were any errors to troubleshoot
                judge: function(pz){
                    // Judge whether to choose from the artist member or the overall member
                    // Add the current state to the LocalStorage.flag
                    if(!localStorage.flag) localStorage.flag = "";
                    localStorage.flag = pz; 
                }

            }
        });
    })();

    // Start Vue debugging mode, comment out if you don't want to debug
    // Vue.config.devtools = true;