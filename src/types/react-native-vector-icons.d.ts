declare module 'react-native-vector-icons/MaterialIcons' {
  import { Component } from 'react';
  import { TextStyle, ViewProps } from 'react-native';

  interface IconProps extends ViewProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
    children?: any;
  }

  export default class MaterialIcons extends Component<IconProps> {}
}

declare module 'react-native-vector-icons/Feather' {
  import { Component } from 'react';
  interface IconProps extends ViewProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
  }
  export default class Feather extends Component<IconProps> {}
}

