import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelList
} from 'stream-chat-react';
import {
  Auth, 
  MessagingContainer, 
  Video
} from  './components';
import '@stream-io/stream-chat-css/dist/css/index.css';
import { useCookies } from 'react-cookie';

const filters = { type: 'messaging' };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

const client = StreamChat.getInstance('hmeg522az47x');

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']); 
  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState(null);
  const [users, setUsers] = useState(null);

  const authToken = cookies.AuthToken;

  useEffect(() => {
    if(authToken) {
      const fetchData = async () => {
        const { users } = await client.queryUsers({ role: 'user'});
        setUsers(users)
      }

      fetchData().catch(console.error);
    }
  }, [])

  const setupClient = async () => {
    try {
      console.log(cookies.hashedPassword);
      await client.connectUser(
        {
          id: cookies.UserId,
          name: cookies.Name,
          hashedPassword: cookies.HashedPassword
        },
        authToken,
      );
      const channel = await client.channel('messaging', 'messaging-demo', {
        name: "Messaging",
      })
      setChannel(channel);

      setClientReady(true);
    } catch (err) {
      console.log(err);
    }
  };

  if(authToken) setupClient();

  //if (!clientReady) return <p>Client not ready</p>;

  return (
    <>
      {!authToken && <Auth />}
      {authToken && <Chat client={client} darkMode={true}>
        <ChannelList filters={filters} sort={sort} options={options} />
        <Channel channel={channel}>
          <Video />
          <MessagingContainer users={ users }/>
        </Channel>
      </Chat>}
    </>
  );
};

export default App;