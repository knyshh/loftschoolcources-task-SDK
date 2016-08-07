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
          let source = friendsItem.innerHTML;
          let templateFn = Handlebars.compile(source);
          let template = templateFn({ list: serverAnswer.response.items });

          results.innerHTML = template;

          resolve();
        }
      });
    });
  }).catch(function(e) {
    alert(`Ошибка: ${e.message}`);
  });
//})();
