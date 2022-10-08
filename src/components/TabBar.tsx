import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';

interface Props {
  tabs: string[];
  selected: string;
  onTabChange: (tab: string) => void;
}

const TabBar: FC<Props> = ({tabs, selected, onTabChange}) => {
  const handleTabChange = (tab: string) => () => onTabChange(tab);

  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isSelected = tab === selected;
        return (
          <TouchableOpacity
            key={tab}
            onPress={handleTabChange(tab)}
            style={[styles.tab, isSelected && styles.selected]}>
            <Text style={isSelected && styles.selectedText}>{tab}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  tab: {
    flexGrow: 1,
    flexBasis: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    padding: 10,
  },
  selected: {
    backgroundColor: '#ffffff',
  },
  selectedText: {
    color: 'gray',
  },
});

export default TabBar;
