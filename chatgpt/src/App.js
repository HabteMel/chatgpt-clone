import './App.css';

function App() {
  return (
    <div className="App">
      <section className='sideBar'>
        <nav className='sideBarNavigation'>
          <h4>My Chats</h4>
          <p>Hide</p>
        </nav>
        <button className='newChatButton'>New Chat +</button>

        <ul className='chatHistory'>
          <li>Chat History</li>
          <li>Chat History</li>
          <li>Chat History</li>
          <li>Chat History</li>
          <li>Chat History</li>
        </ul>
      </section>

      <section className='main'>
        <h1>How can i help you today?</h1>
        <input className='mainInput' placeholder='Type your question here.'/>
      </section>

    </div>
  );
}

export default App;
