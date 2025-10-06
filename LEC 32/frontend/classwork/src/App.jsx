import { useEffect, useState, useRef } from 'react';
function App() {
  let [ws, setWs] = useState(null);//to create state variable
  let inputRef = useRef();//store any dom element referance , 
  // and it is different from useState beacuse it does not trigger 
  // re-rendering of a component
  
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8888');
    setWs(socket);
    socket.onmessage = (data) => {
      console.log('Message from server ', data.data);
    }
  }, []);

  function sendMessage() {
    let message = inputRef.current.value;
    ws.send(message);
    inputRef.current.value = "";

    
  }

  return (
    <>
      <h1>ping pong</h1>
      <input ref={inputRef} type="text" />
      <button onClick={sendMessage}>Send</button>
    </>
  )
}

export default App
