import React,{useState} from 'react'
import { KeyboardTypeOptions, NativeSyntheticEvent, StyleProp, StyleSheet, TextInput, TextInputFocusEventData, TouchableOpacity, View, ViewStyle } from 'react-native'
import { colors } from '../../../config/colors'
import { mvs } from '../../../config/metrices'
import Regular from '../../../typography/regular-text'
import { Row } from '../row'
import Feather  from 'react-native-vector-icons/Feather';
type props = {
    onChangeText: (text:string) => void
    value: string
    label: string
    placeholder?: string
    onPress?: () => void;
    error?: string;
    isPassword?: boolean;
    editable?:boolean;
    disabledSearch?:boolean;
    style?:StyleProp<ViewStyle>
    labelStyle?:StyleProp<ViewStyle>
    containerStyle?:StyleProp<ViewStyle>
    secureTextEntry?: boolean | undefined
    keyboardType?: KeyboardTypeOptions | undefined
    onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined
}
 const PrimaryInput = (props: props) => {
    const {
        onChangeText,
        value,
        onPress,
        style,
        label,
        placeholder='type here',
        labelStyle,
        containerStyle,
        secureTextEntry,
        keyboardType,
        editable,
        isPassword,
        error,
        onBlur

    } = props;
    return (
        <View style={[styles.Container,containerStyle]}>
            <Regular style={[styles.labelStyle,labelStyle]} label={label}/>
            <TextInput editable={editable} onBlur={onBlur} keyboardType={keyboardType} secureTextEntry={secureTextEntry}  value={value} placeholder={placeholder} onChangeText={onChangeText} style={[styles.textInput,style]}/>
        </View>
    )
};
export const MessageInput = (props: props) => {
    const {
      onChangeText,
      onPress = () => {},
      value,
      style,
      placeholder = 'Write Message',
      containerStyle,
      isPassword,
      keyboardType,
      error,
      onBlur = () => {},
    } = props;
    return (
      <>
        <Row style={[styles.messageContainer, containerStyle]}>
          <TextInput
            onBlur={onBlur}
            keyboardType={keyboardType}
            value={value}
            placeholderTextColor={`${colors.black}50`}
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={[styles.textInput, style]}
          />
          {/* <TouchableOpacity style={styles.PasswordIcon} onPress={onPress}>
            <Entypo size={20} name={'attachment'} color={colors.attachmentgray} />
          </TouchableOpacity> */}
        </Row>
      </>
    );
  };

export default React.memo(PrimaryInput)
export const SearchInput = (props: props) => {
  const [secure, setSecure] = useState(true);
  const {
    onChangeText,
    value,
    style,
    label,
    placeholder = 'search here',
    labelStyle,
    containerStyle,
    secureTextEntry,
    keyboardType,
    error,
    onBlur,
    mtop,
    editable,
    disabledSearch = true,
  } = props;
  return (
    <View style={[styles.searchContainer, containerStyle]}>
      <TouchableOpacity
        disabled={disabledSearch}
        style={styles.searchIcon}
        onPress={() => {}}>
        <Feather size={mvs(22)} name={'search'} color={colors.grey} />
      </TouchableOpacity>
      <TextInput
        editable={editable}
        onBlur={onBlur}
        keyboardType={keyboardType}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={`${colors.grey}`}
        onChangeText={onChangeText}
        style={[styles.searchTextInput, style]}
      />
      {/* <TouchableOpacity
        disabled={disabledSearch}
        style={styles.searchIcon}
        onPress={() => {}}>
        <Image source={menue} style={{height: mvs(15), width: mvs(25)}} />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
    Container:{
        borderBottomWidth:0.7,
        paddingTop:mvs(7),
        marginBottom:mvs(15),
    },
    textInput:{
        color:colors.black,
        textAlignVertical:'center',
        height:mvs(40),
    },
    labelStyle:{
        color:colors.primary,
    },
    messageContainer: {
        alignItems: 'flex-start',
        paddingVertical: mvs(7),
        borderRadius: mvs(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: mvs(10),
        backgroundColor: '#F6F6F6',
        marginTop: mvs(5),
        flex: 1,
      },
      searchContainer: {
        height: mvs(52),
        borderRadius: mvs(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: mvs(16.5),
        backgroundColor: colors.white,
        alignItems: 'center',
        borderWidth:mvs(1),
        borderColor:colors.grey
        // ...colors.shadow,
      },
      searchIcon: {
        // backgroundColor: colors.primary,
        borderRadius: mvs(20),
        justifyContent: 'center',
        alignItems: 'center',
      },
      searchTextInput: {
        color: colors.black,
        textAlignVertical: 'center',
        height: mvs(36),
        fontSize: mvs(14),
        flex: 1,
        paddingHorizontal: mvs(10),
        padding: mvs(0),
      },
})