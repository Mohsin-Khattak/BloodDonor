import CustomFlatList from 'components/atoms/custom-flatlist';
import {Loader} from 'components/atoms/loader';
import ChatCard from 'components/atoms/molecules/chat-card';
import {mvs} from 'config/metrices';
import React from 'react';
import {View} from 'react-native';
import AppHeader from '../../components/atoms/headers/index';
import styles from './styles';

const Chat = props => {
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
      onPress={() => props.navigation.navigate('Inbox', {info: item})}
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
