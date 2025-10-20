import { useWebSocket } from "./WebSocketProvider"

export function useChangeUserStatus(){
    const {sendMessage} = useWebSocket();

    const changeFriendListStatus = (friendId:number)=>{
        sendMessage({
            type:"change_friend_list_status",
            friendId
        })
    }

    return changeFriendListStatus;
}