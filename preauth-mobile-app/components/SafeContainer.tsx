

import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

const SafeContainer: React.FC<React.PropsWithChildren<{ className?: string, lowTopPadding?: boolean }>> = ({ children, className, lowTopPadding = true }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <View
        style={{
          paddingTop: lowTopPadding ? 25 : insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
        className={`${className} mx-5`}
      >
        {children}
      </View>
    </SafeAreaProvider>
  );
};

export default SafeContainer;