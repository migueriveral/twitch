import {useState} from 'react';
import {
    ChannelHeader,
    MessageList,
    MessageInput,
    Thread,
    Window,
  } from 'stream-chat-react';
import { useCookies } from 'react-cookie';
import UserList from './UserList';
import { FaUsers, FaArrowAltCircleLeft} from 'react-icons/fa';

const MessagingContainer = ({ users }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [userListVisible, setUserListVisible] = useState(false); 
    
    const logout = () => {
        removeCookie('Name', cookies.Name);
        removeCookie('HashedPassword', cookies.HashedPassword);
        removeCookie('UserId', cookies.UserId);
        removeCookie('AuthToken', cookies.AuthToken);

        window.location.reload();
    }   
    return (
        <div className="messaging-container">
            {!userListVisible && <Window>
                <FaUsers className='icon' onClick={() => setUserListVisible(true)}/>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
                <button 
                    className='standard-button' 
                    onClick={logout}>
                        Logout
                </button>
            </Window>
            }
            {userListVisible && <Window>
                <FaArrowAltCircleLeft className='icon' onClick={() => setUserListVisible(false)}/>
                <ChannelHeader title='Users'/>
                <UserList users={ users }/>
                <button 
                    className='standard-button' 
                    onClick={logout}>
                        Logout
                </button>
            </Window>
            }
            <Thread />
        </div>
    )
}

export default MessagingContainer;