import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors } from '@/theme';

export interface ChatBubbleIconProps {
  size?: number;
  color?: string;
  fillColor?: string;
  strokeWidth?: number;
}

export const ChatBubbleIcon: React.FC<ChatBubbleIconProps> = ({
  size = 20,
  color = colors.textPrimary,
  fillColor = 'none',
  strokeWidth = 1.8,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.5 11.75C21.5 16.86 17.25 21 12 21C10.35 21 8.8 20.59 7.44 19.86L3.35 20.92C2.73 21.08 2.17 20.52 2.33 19.9L3.39 15.81C2.82 14.57 2.5 13.2 2.5 11.75C2.5 6.64 6.75 2.5 12 2.5C17.25 2.5 21.5 6.64 21.5 11.75Z"
        fill={fillColor}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="8.5" cy="11.75" r="1.15" fill={color} />
      <Circle cx="12" cy="11.75" r="1.15" fill={color} />
      <Circle cx="15.5" cy="11.75" r="1.15" fill={color} />
    </Svg>
  );
};

export default ChatBubbleIcon;
