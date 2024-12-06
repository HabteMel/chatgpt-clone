import './App.css';

function App() {
  
  }

  return (
    <div className="App">
      <section className='sideBar'>
        <nav className='sideBarNavigation'>
          <h4>My Chats</h4>
          <button>Sign Out</button>
        </nav>
        <ul className='chatHistory'>
            <li >
            </li>
        </ul>
        <button className='newChatButton'>New Chat +</button>
      </section>

      <section className='main'>
        <h1>How can I help you today?</h1>
        <form onSubmit>
          <input
            className='mainInput'
            placeholder='Type your question here.'
          />
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );

export default App;

