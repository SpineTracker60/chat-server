import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    sender_member: { type: Schema.Types.Number, required: true },
    tag: { type: String, required: true, enum: ["chat", "info", "question", "recommend"] },
    body: Schema.Types.Mixed,
    room: { type: Schema.Types.String, index: true, required: true },
  },
  {
    collection: "CHAT",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
      currentTime: () => {
        return new Date().getTime() + 9 * 3600000;
      },
    },
  }
);

ChatSchema.index({ created_at: -1 });
ChatSchema.index({ room: -1 });

ChatSchema.plugin(mongoose_delete, { overrideMethods: true });

const Chat = mongoose.model("CHAT", ChatSchema);

export default Chat;
