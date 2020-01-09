# A simple lottery game program
# 一个简单的抽奖程序
# Eine einfache lottery Spielprojekt

## 0. Learning
   I knew nothing about JavaScript, HTML or CSS. In two months, I've reached this far. So I guess this is a milestone that 
   indicates my start of the journey of front-end web development. 
   
   两个月的HTML,CSS,JavaScript学习的里程碑记录。一个简单的读取公司名单，员工照片，抽奖球滚动，选中人照片及信息显示，实时表格录入，
   快捷键控制，同屏切换不同奖项，撤销上一次选择。
   
   Zwei Monaten zurück kennt ich nichts dieses Gebiets auf JavaScript,HTML oder CSS. Trotzdem bin ich hier jetzt. 
   
## 1. Installation
   Download, unpack, open index.html(Screen resolution: 1980*1080).
   
## 2. Basic operations
   Keyboard shortcuts:
      1 ---  Fourth prize
      2 ---  Third prize
      3 ---  Second prize
      4 ---  First prize
      5 ---  Special prize
      6 ---  Lucky Boss
      7 ---  Lucky Star
      8 ---  Lucky actor
      SPACE  ---  Start/Stop
      R ---  RESET
      ENTER --- Toggle fullscreen(browser)
      T ---  Destroy toggleJumpscare
      BACKSPACE --- Delete last chosen candidate(Undo)
    
## 3. Issues
      The color of the candidates doesn't restore its original state after undo.
## 4. Time to move on
      This project has been discontinued for its initial intention was only to fulfill the requirement of a lottery game
      program for the annual celebration in my company and its poor design that even uses the Vue instance as a 
      global variable to realize some functionalities, which a lot of people diss as the wrong side of JavaScript. 
      And the mounted part in Vue has too many encapsulated parts that reloads every time the page is updated, which 
      is totally not necessary. 
      
      Anyway, the original version is ready for 'productional' use. Future work is mainly aimed at expanding my technology
      stack including: Front-end(CSS modules, Bootstrap, electron-vue, computer networking principle, AJAX, Deeper JavaScript
      topics, Vue, Testing, webpack), Back-end(MongoDB, Node.js) and some dev-ops like Jenkins, Selenium for further development
      of software skills.
