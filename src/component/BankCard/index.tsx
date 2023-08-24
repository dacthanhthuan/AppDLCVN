import * as React from 'react';
import Svg, {
  G,
  Rect,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  SvgProps,
  Text,
} from 'react-native-svg';
import {WINDOW_WIDTH} from '../../global';

interface BankCardProps extends SvgProps {
  bankName: string;
  bankAccount: string;
  userName: string;
}

function BankCard(props: BankCardProps) {
  const ratio = 640 / 372;
  const width = WINDOW_WIDTH - 30;
  const height = width / ratio;

  const sparateBankAccount = () => {
    const one = props.bankAccount.substring(0, 4);
    const two = props.bankAccount.substring(4, 8);
    const three = props.bankAccount.substring(8, 12);
    const four = props.bankAccount.substring(12, 16);
    return `${one} ${two} ${three} ${four}`;
  };

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 640 372"
      fill="none"
      {...props}>
      <G clipPath="url(#clip0_2_2)">
        <Rect width={640} height={372} rx={15} fill="url(#paint0_linear_2_2)" />
        <Circle cx={14} cy={457} r={329} fill="#000" fillOpacity={0.1} />
        <Circle cx={849.5} cy={699.5} r={563.5} fill="#000" fillOpacity={0.1} />
        <Circle cx={566.5} cy={103.5} r={237.5} fill="#fff" fillOpacity={0.1} />
        <Text
          fontSize={45}
          fill={'#fff'}
          dx={320}
          dy={372 / 2}
          textAnchor="middle"
          fontFamily="montserrat-semibold">
          {props.bankName}
        </Text>
        <Text
          fontSize={35}
          fill={'#fff'}
          dx={30}
          dy={290}
          textAnchor="start"
          fontFamily="montserrat-semibold">
          {props.userName}
        </Text>
        <Text
          fontSize={40}
          fill={'#fff'}
          dx={30}
          dy={345}
          textAnchor="start"
          fontFamily="montserrat-semibold">
          {sparateBankAccount()}
        </Text>
        <Path
          d="M578.956 306.676a19.511 19.511 0 00-7.985-1.676c-8.79 0-15.001 5.398-15.039 13.124-.072 5.678 4.403 8.878 7.786 10.792 3.475 1.959 4.637 3.179 4.62 4.917-.017 2.679-2.778 3.873-5.318 3.873-3.53 0-5.445-.584-8.398-2.089l-1.096-.63-1.252 8.924c2.149 1.065 5.999 2.001 9.973 2.089 9.363 0 15.468-5.352 15.537-13.604.072-4.525-2.324-7.959-7.428-10.792-3.08-1.826-5.009-3.071-5.009-4.943 0-1.654 1.647-3.392 5.084-3.392 2.281-.07 4.549.441 6.659 1.5l.842.455 1.234-8.594-.21.046zm22.849-.936h-6.875c-2.148 0-3.743.698-4.692 3.288l-13.214 36.404h9.347l1.884-5.962 11.402.021c.285 1.391 1.09 5.937 1.09 5.937H609l-7.195-39.688zm-58.53-.326h8.9l-5.569 39.709h-8.9l5.569-39.73v.021zm-22.629 21.868l.911 5.528 8.717-27.07h9.436l-14.038 39.625h-9.395l-7.7-33.554a2.33 2.33 0 00-.309-.768 1.894 1.894 0 00-.533-.557 33.701 33.701 0 00-8.735-3.94l.107-.831h14.358c1.935.088 3.51.831 4.046 3.355l3.135 18.233v-.021zm70.146 4.07l3.564-11.118c-.055.104.732-2.286 1.179-3.79l.609 3.414 2.062 11.469h-7.414v.025z"
          fill="#fff"
        />
        <Path
          d="M65 47L50 65h13.5L62 77l15-18H63.5L65 47z"
          stroke="#fff"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M567.125 50.833c3.769 3.071 5.833 6.941 5.833 10.938 0 3.996-2.064 7.867-5.833 10.937M574.417 45c4.699 4.633 7.291 10.596 7.291 16.77 0 6.176-2.592 12.14-7.291 16.772M561.292 56.667c.948 1.49 1.458 3.275 1.458 5.104 0 1.829-.51 3.613-1.458 5.104"
          stroke="#fff"
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_2_2"
          x1={-162}
          y1={-67.5}
          x2={568.5}
          y2={307.5}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#007CFF" />
          <Stop offset={1} stopColor="#90F" />
        </LinearGradient>
        <ClipPath id="clip0_2_2">
          <Rect width={640} height={372} rx={15} fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default BankCard;
