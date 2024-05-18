/* eslint-disable react-native/no-inline-styles */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { View, useWindowDimensions } from "react-native";
import Animated, {
  CurvedTransition,
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDebounce } from "use-debounce";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { Input, Typography } from "@components";

import * as S from "./styles";

export interface IOption {
  title: string;
  label: string;
  value: any;
  icon: string;
}

interface IBottomSheetProps {
  options: IOption[];
  title: string;
  onSelect: (option: any) => void;
  enableFilter?: boolean;
}

export interface IBottomSheetRef {
  show(): void;
}

const BottomSheet: React.ForwardRefRenderFunction<
  IBottomSheetRef,
  IBottomSheetProps
> = ({ options, onSelect, enableFilter, title }, ref) => {
  const [filtered, setFiltered] = useState<IOption[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchTermDebouce] = useDebounce(searchTerm, 1500);
  const [visible, setVisible] = useState(false);
  const { height } = useWindowDimensions();
  const translateY = useSharedValue<number>(height * 2);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(translateY.value, {
            duration: 800,
            easing: Easing.linear,
          }),
        },
      ],
    };
  });

  const transition = CurvedTransition.easingY(Easing.elastic(1.5));

  useEffect(() => {
    if (visible) {
      translateY.value = 0;
    } else {
      translateY.value = height * 2;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useImperativeHandle(ref, () => ({
    show() {
      setVisible(!visible);
    },
  }));

  useEffect(() => {
    if (searchTermDebouce) {
      const filteredOptions = options.filter((option) =>
        option.title.toLowerCase().includes(searchTermDebouce.toLowerCase())
      );
      setFiltered(filteredOptions);
    } else {
      setFiltered(options);
    }
  }, [options, searchTermDebouce]);

  return (
    <Animated.View style={[S.containerStyle(height), style]}>
      {visible && (
        <Animated.View
          entering={FadeIn}
          style={{ position: "relative", marginBottom: 8 }}
        >
          <Typography size="xl" light textAlign="center" fontWeight="600">
            {title}
          </Typography>
          <Material
            onPress={() => setVisible(false)}
            name="close"
            size={24}
            color={"#FFF"}
            style={{ right: 16, position: "absolute" }}
          />
        </Animated.View>
      )}
      {visible && enableFilter && (
        <Animated.View entering={FadeIn} style={{ marginBottom: 8 }}>
          <Input
            light
            uppercase
            placeholder="Pesquise o TOKEN"
            onChangeText={(_searchTerm) => setSearchTerm(_searchTerm)}
          />
        </Animated.View>
      )}
      {visible && (
        <Animated.FlatList
          entering={FadeIn}
          layout={transition}
          data={filtered}
          renderItem={({ item }) => {
            return (
              <Animated.View layout={transition}>
                <S.ButtonItem
                  onPress={() => {
                    setVisible(false);
                    onSelect(item.value);
                  }}
                >
                  <S.ImgCoin source={{ uri: item.icon }} />
                  <View>
                    <Typography light>{item.title}</Typography>
                    <Typography light size="sm">
                      {item.label}
                    </Typography>
                  </View>
                </S.ButtonItem>
              </Animated.View>
            );
          }}
        />
      )}
    </Animated.View>
  );
};

export default forwardRef(BottomSheet);
