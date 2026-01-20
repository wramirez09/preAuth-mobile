import { useEffect, useState } from 'react';
import { Dimensions, Keyboard, Platform } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const COLLAPSED = SCREEN_HEIGHT * 0.85;
const EXPANDED = SCREEN_HEIGHT;

export function useSheetHeight() {
    const [maxHeight, setMaxHeight] = useState(COLLAPSED);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    useEffect(() => {
        const show = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            (e) => {
                setKeyboardOpen(true);
                setKeyboardHeight(e.endCoordinates?.height ?? 0);
                setMaxHeight(EXPANDED);
            }
        );

        const hide = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                setKeyboardOpen(false);
                setKeyboardHeight(0);
                setMaxHeight(COLLAPSED);
            }
        );

        return () => {
            show.remove();
            hide.remove();
        };
    }, []);

    return { maxHeight, keyboardHeight, keyboardOpen };
}
