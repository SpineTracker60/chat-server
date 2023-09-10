import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const Schema = mongoose.Schema;

const ChatRoomSchema = new Schema(
  {
    title: { type: String, unique: true },
    member: { type: Schema.Types.Number, unique: true, required: true },
    note: { type: String, default: "" },
  },
  {
    collection: "CHAT_ROOM",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
      currentTime: () => {
        return new Date().getTime() + 9 * 3600000;
      },
    },
  }
);

ChatRoomSchema.index({ user: 1, coach: 1 });

ChatRoomSchema.plugin(mongoose_delete, { overrideMethods: true });

const ChatRoom = mongoose.model("CHAT_ROOM", ChatRoomSchema);

export default ChatRoom;
