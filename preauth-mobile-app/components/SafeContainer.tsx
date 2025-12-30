

import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

const SafeContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaProvider>
            <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>
                {children}
            </View>
        </SafeAreaProvider>
    );
};

export default SafeContainer;