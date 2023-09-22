import ChatModel from "../models/chat";
import roomService from "./room.service";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

exports.create = async (io, chatDTO) => {
  const room = await roomService.findByMemberId(chatDTO.memberId);
  const roomId = room._id.toString();
  const chat = new ChatModel({
    sender_member: chatDTO.memberId,
    tag: chatDTO.chatTag,
    body: chatDTO.chat,
    room: roomId,
  });
  const newChat = await chat.save();
  io.of("/room").to(roomId).emit("chat", chat);
  return { success: true, newChat };
};

exports.requestChatBot = async (io, chatData, memberInfo, memberPosture) => {
  try {
    console.log("memberPosture : ", memberPosture);
    const chatbotResults = await axios.post(process.env.CHATBOT_HOST, {
      id: chatData.sender_member,
      question: chatData.body,
      age: memberInfo.age,
      gender: memberInfo.gender,
      job: memberInfo.job,
      turtle_neck: memberPosture.turtle_neck,
      sleepiness: memberPosture.sleepiness,
      asymmetry: memberPosture.asymmetry,
      stooped_position: memberPosture.stooped_position,
    });
    io.of("/room").to(chatData.room).emit("chat", chatbotResults.data);
    return chatbotResults.data;
  } catch (err) {
    console.log(err);
    return { success: false, err };
  }
};

exports.requestUserInfo = async (memberId) => {
  try {
    const userInfoResults = await axios.get(`${process.env.APPLICATION_HOST}/member/info?memberId=${memberId}`);
    return userInfoResults.data;
  } catch (err) {
    console.log(err);
    return { success: false, err };
  }
};

exports.requestUnstablePosture = async (memberId) => {
  try {
    const unStablePostureResults = await axios.get(`${process.env.APPLICATION_HOST}/posture/ratio?memberId=${memberId}`);
    return unStablePostureResults.data;
  } catch (err) {
    console.log(err);
    return { success: false, err };
  }
};
