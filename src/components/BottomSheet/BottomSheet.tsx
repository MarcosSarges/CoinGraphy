import Input from "@components/Input";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  BounceOut,
  Easing,
  FadeIn,
  LightSpeedInRight,
  LinearTransition,
  SequencedTransition,
  ZoomOutDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDebounce } from "use-debounce";

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
            duration: 1000,
          }),
        },
      ],
    };
  });

  const transition = SequencedTransition.delay(1000);

  useEffect(() => {
    setFiltered(options);
  }, [options]);

  useEffect(() => {
    if (visible) {
      translateY.value = 0;
    } else {
      translateY.value = height;
    }
  }, [visible]);

  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true);
    },
  }));

  useEffect(() => {
    if (!!searchTermDebouce) {
      const filteredOptions = options.filter((option) =>
        option.title.toLowerCase().includes(searchTermDebouce.toLowerCase())
      );
      setFiltered(filteredOptions);
    } else {
      setFiltered(options);
    }
  }, [searchTermDebouce]);

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: height / 2,
          backgroundColor: "#1E1E1E",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 16,
        },
        style,
      ]}
    >
      {visible && (
        <Animated.View entering={FadeIn}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "800",
              marginBottom: 8,
              color: "white",
            }}
          >
            {title}
          </Text>
        </Animated.View>
      )}
      {visible && enableFilter && (
        <Animated.View entering={FadeIn}>
          <Input
            light
            placeholder="Pesquise o TOKEN"
            onChangeText={(searchTerm) => setSearchTerm(searchTerm)}
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
              <Animated.View
                entering={LightSpeedInRight.delay(200 * 2).springify()}
                exiting={BounceOut}
                layout={transition}
              >
                <TouchableOpacity
                  style={{
                    width: "100%",
                    padding: 10,
                    height: 50,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    setVisible(false);
                    onSelect(item.value);
                  }}
                >
                  <Image
                    style={{ height: 30, width: 30, marginRight: 16 }}
                    source={{ uri: item.icon }}
                  />
                  <View>
                    <Text>{item.title}</Text>
                    <Text style={{ fontSize: 12 }}>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          }}
        />
      )}
    </Animated.View>
  );
};

export default forwardRef(BottomSheet);
