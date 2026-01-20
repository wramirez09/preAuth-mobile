import React, { CSSProperties } from 'react';

// @ts-ignore
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';
import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { ColorValue } from 'react-native';
import styles from 'react-native-gifted-chat/src/styles';

cssInterop(LinearGradient, {
    className: 'style',
});

/**
 * Gradient recipe
 */
const linearGradientStyle = tva({
    base: 'rounded-xl',
    variants: {
        variant: {
            guide: '',
            primary: '',
            subtle: '',
        },
    },
    defaultVariants: {
        variant: 'guide',
    },
});

/**
 * Variant → gradient config
 */
const gradientMap = {
    guide: {
        colors: ['#2563EB', '#4F46E5'], // blue-600 → indigo-600
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
    },
    primary: {
        colors: ['#0EA5E9', '#2563EB'],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
    },
    subtle: {
        colors: ['#E5E7EB', '#F9FAFB'],
        start: { x: 0, y: 0 },
        end: { x: 0, y: 1 },
    },
};

type LinearGradientCoreProps = {
    variant?: keyof typeof gradientMap;
    className?: string;
    colors?: [ColorValue, ColorValue, ...ColorValue[]],
    styes?: CSSProperties
    children?: React.ReactNode;
};

export const LinearGradientCore = React.forwardRef<
    LinearGradient,
    LinearGradientCoreProps
>(({ variant = 'guide', className, colors, children, ...props }, ref) => {
    const gradient = gradientMap[variant];

    return (
        <LinearGradient
            ref={ref}
            colors={colors ?? ['#2563EB', '#4F46E5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            {...props}
            className={`${linearGradientStyle({ variant, class: className })} h-[40%] w-full`}
        >
            {children}
        </LinearGradient>
    );
});

export default LinearGradientCore;
