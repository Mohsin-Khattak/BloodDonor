import CustomFlatList from 'components/atoms/custom-flatlist';
import {Loader} from 'components/atoms/loader';
import ChatCard from 'components/atoms/molecules/chat-card';
import {mvs} from 'config/metrices';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import AppHeader from '../../components/atoms/headers/index';
import styles from './styles';
import {appFBS} from 'services/firebase/firebase-actions';
import firestore from '@react-native-firebase/firestore';
import {colors} from 'config/colors';

const Chat = props => {
  const [loading, setLoading] = React.useState(true);

  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    firestore().collection('chat').onSnapshot(onChatResult);
  }, []);
  async function onChatResult(QuerySnapshot) {
    await getChats();
  }
  const getChats = async () => {
    try {
      setLoading(true);
      let list = [];
      list = await appFBS.getConversationList();
      setConversation(list);
    } catch (error) {
      console.log('Error in chatting', error);
    } finally {
      setLoading(false);
    }
  };
  const renderItem = ({item}) => (
    <ChatCard
      item={item}
      onPress={() => props.navigation.navigate('Inbox', {data: item})}
    />
  );
  return (
    <View style={styles.container}>
      <AppHeader title="Chat" />

      {loading ? (
        <Loader color={colors.primary} />
      ) : (
        <CustomFlatList
          showsVerticalScrollIndicator={false}
          data={conversation}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: mvs(20),
            paddingHorizontal: mvs(20),
          }}
        />
      )}
    </View>
  );
};
export default Chat;
