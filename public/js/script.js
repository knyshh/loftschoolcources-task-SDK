(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//(function () {
  //"use strict";
  new Promise(function(resolve) {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.onload = resolve;
    }
  }).then(function() {
    return new Promise(function(resolve, reject) {
      VK.init({
        apiId: 5574058
      });

      VK.Auth.login(function(response) {
        if (response.session) {
          resolve(response);
        } else {
          reject(new Error('Не удалось авторизоваться'));
        }
      }, 2);
    });
  }).then(function() {
    return new Promise(function(resolve, reject) {
      VK.api('users.get', {'name_case': 'gen'}, function(response) {
        if (response.error) {
          reject(new Error(response.error.error_msg));
        } else {
          headerInfo.textContent = `Друзья на странице ${response.response[0].first_name} ${response.response[0].last_name}`;

          resolve();
        }
      });
    })
  }).then(function() {
    return new Promise(function(resolve, reject) {
      VK.api('friends.get', {v: '5.53',fields: 'photo_100,first_name,last_name,bdate',name_case: 'nom'}, function(serverAnswer) {

        if (serverAnswer.error) {
          reject(new Error(serverAnswer.error.error_msg));
        } else {

            let currDate = new Date(), //get current date
                currDateMonth = currDate.getMonth() + 1,
                currDateDay = currDate.getDate();


            let sortAB = require('./module/sortedAB');//get function

            //get before date items
            let beforeDate = serverAnswer.response.items.filter(item => {
                    if(item.bdate) {
                if(item.bdate.split('.')[1] < currDateMonth || item.bdate.split('.')[1] == currDateMonth && item.bdate.split('.')[0] < currDateDay) {
                    return item;
                    }
                }
              }).sort(sortAB);

            //get after date items
           let afterDate = serverAnswer.response.items.filter(item => {
                    if(item.bdate) {
                if(item.bdate.split('.')[1] > currDateMonth || item.bdate.split('.')[1] == currDateMonth && item.bdate.split('.')[0] > currDateDay) {
                    return item;
                    }
                }
            }).sort(sortAB);

            //get items with udnefined date
            let undefinedDate = serverAnswer.response.items.filter(item => {
                    if(!item.bdate){
                return true;
                }
            });

            let sortedList = afterDate.concat(beforeDate,undefinedDate) //get all items form one array

            let source = friendsItem.innerHTML;
            let templateFn = Handlebars.compile(source);
            let template = templateFn({ list:  sortedList });
            results.innerHTML = template; // adding to te page


          resolve();
        }
      });
    });
  }).catch(function(e) {
    alert(`Ошибка: ${e.message}`);
  });
//})();

},{"./module/sortedAB":2}],2:[function(require,module,exports){
function sortAB(a, b) {
    let
        aMonth = parseInt(a.bdate.split('.')[1]),
        bMonth = parseInt(b.bdate.split('.')[1]),
        aDay = parseInt(a.bdate.split('.')[0]),
        bDay = parseInt(b.bdate.split('.')[0]);


    if(aMonth > bMonth) return 1;
    else if(aMonth < bMonth) return -1;
    else {
        if(aDay > bDay) return 1;
        else if(aDay < bDay) return -1;
        else return 0;
    }
}
module.exports = sortAB;
},{}]},{},[1])