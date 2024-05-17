import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import CustomFlatList from 'components/atoms/custom-flatlist';
import {mvs} from 'config/metrices';
import ChatCard from 'components/atoms/molecules/chat-card';
import {Loader} from 'components/atoms/loader';
import AppHeader from '../../components/atoms/headers/index';
import Regular from 'typography/regular-text';

const Chat = () => {
  // const isFocus = useIsFocused();
  // const {chat} = useAppSelector(s => s);

  const [loading, setLoading] = React.useState(false);
  const data = [
    {id: 1, name: 'Mohsin'},
    {id: 2, name: 'Ali'},
    {id: 3, name: 'Aqib'},
  ];

  // React.useEffect(() => {
  //   if (isFocus) dispatch(getConversationsList(setLoading));
  // }, [isFocus]);

  const renderItem = ({item}) => (
    <ChatCard
      item={item}
      // onPress={() => navigate('InboxScreen', {info: item})}
    />
  );
  return (
    <View style={styles.container}>
      <AppHeader title="Chat" />

      {loading ? (
        <Loader />
      ) : (
        <CustomFlatList
          showsVerticalScrollIndicator={false}
          data={data}
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
