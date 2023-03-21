/*
    Student: Peiyi Li
    Instructor's name: Benjamin Dicken
    Date: 2023/3/20
    Course: CSC 337
    Project Name: Chatty
    File Name: chatty.js
    Description:
        PA #8 Chatty
        In this assignment, the task is to write a chat application called "Chatty". From this page, 
        the user should be able to specify an alias (username) and then start sending messages using 
        other text fields and the "Send Message" button.
*/

function getMsg() {
  var httpRequest = new XMLHttpRequest();
  if (!httpRequest) {
    return false;
  }
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        let chatWindow = document.getElementById('chatWindow');
        chatWindow.innerHTML = httpRequest.responseText;

      } 
    }
  }
  let url = '/chats';
  httpRequest.open('GET', url);
  httpRequest.send();
}

function postMsg() {
  var httpRequest = new XMLHttpRequest();
  if (!httpRequest) {
    return false;
  }
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        getMsg();
      } 
    }
  }
  let alias = encodeURIComponent(document.getElementById('aliasInput').value);
  let message = encodeURIComponent(document.getElementById('messageInput').value);
  let url = '/chats/' + alias + '/' + message;
  document.getElementById('messageInput').value = "";
  httpRequest.open('POST', url);
  httpRequest.send();
}

setInterval(function () { getMsg() }, 1000);