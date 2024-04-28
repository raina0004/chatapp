import axios from 'axios';
import Config from './config.js';

const chat = Config.chatapp;
const HttpService = {
    register: function (data) {
        console.log("coming")
        return axios.post(`${chat}/register`, data);
    },
    login: function (data) {
        console.log("coming")
        return axios.post(`${chat}/login`, data);
    },
    getUser: function (data) {
        console.log("coming")
        return axios.get(`${chat}/getAllUser`, data);
    },
    creteGroup : function (data) {
        return axios.post(`${chat}/group`, data);
    },
    groupName : function (){
        return axios.get(`${chat}/groupName`);
    },
    chatMessage : function (data) {
        return axios.post(`${chat}/messages`, data);
    },
    getGroupWiseMessage : function(groupId){
        return axios.get(`${chat}/chat/${groupId}`);
    }
}
export default HttpService;
