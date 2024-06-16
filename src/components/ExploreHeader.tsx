import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch} from 'hooks/hooks';
import {filterCharacters} from 'store/slices/characterSlice';
import FilterModal from 'components/FilterModal';

const ExploreHeader = () => {
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleFilterChange = (text: string) => {
    dispatch(filterCharacters(text));
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.inputContainer}>
          <FontAwesome
            name="search"
            size={20}
            color="#000"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search..."
            onChangeText={handleFilterChange}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.filterButton} onPress={toggleModal}>
            <Ionicons name="options-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <FilterModal onClose={toggleModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8ef971',
    paddingBottom: 10,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 55,
    marginTop: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  filterButton: {
    backgroundColor: '#007BFF',
    borderRadius: 50,
    padding: 10,
    marginLeft: 10,
  },
});

export default ExploreHeader;
