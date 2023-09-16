import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const Schema = mongoose.Schema;

const RoomSchema = new Schema(
  {
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

RoomSchema.index({ member: 1 });

RoomSchema.plugin(mongoose_delete, { overrideMethods: true });

const Room = mongoose.model("ROOM", RoomSchema);

export default Room;
