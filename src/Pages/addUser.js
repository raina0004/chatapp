import React, { useEffect, useRef, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import HttpService from "../httpservice";


const AddUser = () => {
    const { groupId } = useParams();

    const [chatMessage, setChatMessage] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
    console.log(groupId,"this is prips")

    // Function to hanlde change in new message
    const newMessageChangeHandler = (event) => {
        setNewMessage(event.target.value);
    }

    // Function send new message to chat
    const sendMessageHandler = () => {
        const tempArray = [...chatMessage];
        tempArray.push(newMessage);
        setChatMessage(tempArray);
        setNewMessage("");
    }

    useEffect(() => {
        scrollToBottom();
    }, [chatMessage]);

    useEffect(()=>{
        getGroupWiseMessage()
    },[groupId])

    const getGroupWiseMessage = async() =>{
        console.log(groupId,"this is the g roup id")
        let res = await HttpService.getGroupWiseMessage(groupId);
        console.log(res.data,"this isthe messagwfe")
        setChatMessage(res.data)
        console.log(res,"this is the res is clled")
    }



    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    const handleCall  = async() =>{
        try{
        let obj={
            sender :"662961b154134021c63cf41e",
            text : newMessage,
            groupId : groupId
        }
        let res = await HttpService.chatMessage(obj);
    }catch(error){
        console.log(error)
    }
    }
    console.log(chatMessage,"this is the chat message")
    return (
        <div style={{marginTop:"4rem"}}>
            <div style={{ height: "calc(100vh - 100px)", overflowY: "auto", paddingBottom: "50px" }}>
                {chatMessage && chatMessage?.map((el, i) => {
                    const isEven = i % 2 === 0;
                    const messageStyle = {
                        background: isEven ? "grey" : "lightgreen",
                        color: isEven ? "white" : "black",
                        textAlign: isEven ? "left" : "right",
                        borderRadius: "10px", // Optional: Adds rounded corners to the message bubbles
                        maxWidth: "70%", // Optional: Limits the width of the message bubbles
                        alignSelf: isEven ? "flex-start" : "flex-end", // Aligns the messages to the left or right
                        marginBottom: "5px", // Adds spacing between messages
                        padding: "8px 12px", // Adds padding inside the message bubbles
                    };
                    const containerStyle = {
                        display: "flex",
                        justifyContent: isEven ? "flex-start" : "flex-end",
                    };
                    return (
                        <div key={i} style={containerStyle}>
                            <div style={messageStyle}>
                                <p style={{ margin: 0 }}>{el.text}</p>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <div style={{ position: "fixed", bottom: 0, left: 249, right: 0, backgroundColor: "transparent", padding: "10px" }}>
                <form onSubmit={(e) => { e.preventDefault(); sendMessageHandler(); }} style={{ display: 'flex', alignItems: 'center' }}>
                    <FormControl fullWidth sx={{ m: 1, flexGrow: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Text</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start"></InputAdornment>}
                            label="Amount"
                            value={newMessage} onChange={newMessageChangeHandler}
                            style={{ width: "100%" }} // match the width of the messages container
                        />
                    </FormControl>
                    <Button type="submit" variant="outlined" id={groupId} onClick={handleCall}><SendIcon /></Button>
                </form>
            </div>


        </div>
    )
}

export default AddUser;
