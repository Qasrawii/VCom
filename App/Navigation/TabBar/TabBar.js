import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useContext } from "react";
import { Badge, Icon } from 'native-base';
import { TabStyles } from './TabBar.style';
import colors from '../../Assets/colors';
// import { SafeAreaView } from 'react-native-safe-area-context';

function TabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  if (focusedOptions.keyboardShown) {
    return null
  }
  return (

    <SafeAreaView style={TabStyles.Container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const IconName = options.tabBarIconName
        const IconNameActive = options.tabBarIconNameActive
        const IconType = options.tabBarIconType
        const IconTypeActive = options.tabBarIconTypeActive
        const hasCounter = options.hasCounter
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            key={index}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={TabStyles.Block}
          >
            <Icon textAlign={'center'} as={isFocused ? IconTypeActive : IconType} name={isFocused ? IconNameActive : IconName} size={6} solid={true} textAlign={'center'} style={isFocused ? TabStyles.IconActive : TabStyles.Icon} />
            <Text style={isFocused ? TabStyles.TitleActive : TabStyles.Title}>
              {label}
            </Text>
            {(hasCounter && counter != 0) &&
              <Badge
                bg={colors.primary} rounded="999px"
                zIndex={1} alignSelf="flex-end"
                _text={{
                  fontSize: 11,
                  color: colors.white
                }}
                justifyContent='center' padding={0}
                position='absolute' right={4}
                top={0.5} size={5}
              >
                {counter}
              </Badge>
            }

          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
}
export default TabBar