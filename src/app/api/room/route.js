import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  const rooms = DB.rooms;
  return NextResponse.json({
    ok: true,
    rooms,
    totalRooms: rooms.lenght,
  });
};

export const POST = async (request) => {
  let role = null;
  try{
  const payload = checkToken();
role = payload.role;  
}catch{
  

  return NextResponse.json(
    {
      ok: false,
      message: "Invalid token",
    },
    { status: 401 }
  );
   }
  }

const body = await request.json();
const{roomName} = body;
  readDB();
const found = DB.rooms.found((rooms)=> roomId.roomName == roomName);
if(found >= 0){
  return NextResponse.json(
    {
      ok: false,
      message: `Room ${"replace this with room name"} already exists`,
    },
    { status: 400 }
  );
}


  const roomId = nanoid();
DB.rooms.push({roomId,roomName});
  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};
