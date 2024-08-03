
//const Config = require("./config");
//const buzzk = require("buzzk");
import Config from './config.js'; // 파일 확장자를 명시해야 할 수도 있습니다.
import * as buzzk from 'buzzk'; // 모든 내보내기를 객체로 가져옵니다.
require("dotenv").config();
buzzk.login(process.env.NID_AUT, process.env.NID_SES);
const buzzkChat = buzzk.chat;

async function test() {
    channel_ID = document.getElementById('uid');

    ch = document.getElementById('ch')
    ch.textContent = '접속 채널 : ' + channel_ID.value
}
async function login() {
    const Config = require("./config");
    const buzzk = require("buzzk");
    require("dotenv").config();
    buzzk.login(process.env.NID_AUT, process.env.NID_SES);
    const buzzkChat = buzzk.chat;

    let chSearch = await buzzk.channel.search("shuriel"); //채널 검색
    ini_load()
    let channel = chSearch[0]; //검색 결과 첫번째 채널
    //let channel = await buzzk.channel.get((process.env.channelID);  // 채널 아이디 정보


    const lvDetail = await buzzk.live.getDetail(channel.channelID); //현재 방송 정보

    let chat = new buzzkChat(channel.channelID);
    await chat.connect(); //채팅창 연결
    let recentChat = await chat.getRecentChat(); //최근 채팅 가져오기 (기본값 50개)
    console.log(recentChat);

    chat.onMessage(async (data) => { //채팅이 왔을 때
        for (let o in data) {
            console.log(data[o].message);

            if (data[o].message.slice(0, 1) === "!") {
             
                if (data[o].message === "!팔로우") {
                    let U_name = await chat.getUserInfo(data[o].author.id);
                    let follow_day = new Date(U_name.followDate.substring(0, 10));
                    let today = new Date();
                    let diffTime = today.getTime() - follow_day.getTime();
                    let diffDays = diffTime / (1000 * 60 * 60 * 24);
                    let diffDay = diffDays.toString().split('.');
                    await chat.send(U_name.name + "님은 " + U_name.followDate.substring(0, 10) + "부터 " + diffDay[0] + " 일 동안 팔로우 하셨습니다");
                }
                if (data[o].message === "!정규방송") {
                    await chat.send("월~목 저녁 8시반/ 토~일 오전 9시 방송! 환영합니다!");
                }          
                if (data[o].message === "!첫방송") {
                    await chat.send("첫방송은 2024년 4월 1일 입니다.");
                }          
                if (data[o].message === "!음식") {
                    await chat.send("최애 음식은 김치 오므라이스와 크레페입니다!");
                }          
                if (data[o].message === "!업타임") {
                    let Startbang = await buzzk.live.getDetail(channel.channelID);
                    let today = new Date();
                    let Startbang_time = new Date(Startbang.startOn);
                    let diffTime = today.getTime() - Startbang_time.getTime();
                    let diffMins = diffTime / (1000 * 60);
                    let diffMin = diffMins.toString().split('.');
                    await chat.send("현재 " + diffMin[0] + "분째 방송중입니다");
                }     
                if (data[o].message === "!나이") {
                    let today = new Date();
                    let Startbang_time = new Date("2024-04-01");
                    let diffyear = today.getFullYear() - Startbang_time.getFullYear() + 1;
                    await chat.send("쿠릉이는 " + diffyear + "살이에요~♡");
                }         
                if (data[o].message === "!다운타임") {
                    await chat.send("몹쓸 드립은 야메룽다");
                }         
        
            }

            if (data[o].message === "ㄱㅇㅇ") {
                let U_name = await chat.getUserInfo(data[o].author.id);
                //user.set(U_name.name);
                
            }         
            
            //채팅 보내기 (login 후에만 가능)
            //if (data[o].message === "쿠하") {
            //    let U_name = await chat.getUserInfo(data[o].author.id);
            //    await chat.send(U_name.name + "님 환영 합니다~");
            //}
            //if (data[o].message === "쿠하~") {
            //    let U_name = await chat.getUserInfo(data[o].author.id);
            //    await chat.send(U_name.name + "님 환영 합니다~");
            //}
   

            let userInfo = await chat.getUserInfo(data[o].author.id);
            console.log(userInfo);
            //채팅 보낸 유저의 정보
        }
    });


    chat.onDisconnect(async () => { //채팅창 연결이 끊겼을 때
        //TODO
    });

}

async function ini_load() {
    var config = new Config("./user.ini");
    await config.load();
    console.log(config.set("mysql.dd","dff"));
    //await config.save();
}

//ini_load();
login();