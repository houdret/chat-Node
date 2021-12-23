import React, {useState, useEffect, useRef} from "react";
import Socket from "./Socket";
import "../App.css";


const Chat = ({username}) => { 
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => { 
        Socket.emit("connected", username);        
    }, [username]);

    useEffect(() => {
        Socket.on('messages', message=> {
            setMessages([...messages, message]);
        })
        return () => {Socket.off()};
    },[messages]);

    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.scrollIntoView({behavior: 'smooth'});
    });
  
    const submit = (e) =>{
        e.preventDefault();
        Socket.emit("message", username, message);
        setMessage("");
    }
    return (
        
        <div>
            <h1>Welcome to our chat</h1>
            <div className="card col-md-4 mb-2" id="usercard" >
                <div className="card-hearder">
                    <h3>Users</h3>
                </div>
                <div className="card-body">
                    <div id="usernames">
                    {messages.map((e, i) => <div key={i}><div><i className="fas fa-user"></i> {e.username}</div></div>)}
                    </div>
                </div>
            </div>
            <div className="card col-md-6">
                {messages.map((e, i) => <div key={i}><div>{e.username}</div><div>{e.message}</div></div>)}
                <div ref={divRef}></div>
            </div>
            <form onSubmit={submit}>
                <label htmlFor="" className="form-label">Write your message</label>
                <textarea name="message" id="message" className="form-control" value={message} placeholder="Message" onChange={e => setMessage(e.target.value)}>

                </textarea>
                <div>
                    <button className="btn btn-primary m-2">Send</button>
                </div>
               
            </form>
            
        </div>
       
    )
}

export default Chat;