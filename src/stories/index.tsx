import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {MyButton} from "../App";


storiesOf('Button', module)
  .add('even', () => <MyButton onPress={action('clicked even')} isEven={true}  />)
  .add('odd', () => <MyButton onPress={action('clicked odd')} isEven={false}  />);
