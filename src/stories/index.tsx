import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from '@storybook/react/demo';
import {MyButton} from "../App";


storiesOf('Button', module)
  .add('even', () => <MyButton onPress={() => action('clicked')} isEven={true}  />)
  .add('odd', () => <MyButton onPress={() => action('clicked')} isEven={false}  />);
