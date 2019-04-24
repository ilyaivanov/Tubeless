import React from 'react';

import {storiesOf} from '@storybook/react';

storiesOf('Tree', module)
  .add('tree', () => <SampleTree/>)


const Node = ({level, text}: { level?: number, text: string }) => (
  <div style={{marginLeft: level ? level * 30 : 0, height: 30, alignItems: 'center', display: 'flex'}}>
    <div style={{height: 10, width: 10, backgroundColor: '#000000', borderRadius: 10}}/>
    <span style={{marginLeft: 10}}>{text}</span>
  </div>
);


const SampleTree = () => (
  <div>
    <Node text="Item 1"/>
    <Node text="Something" level={1}/>
    <Node text="beautiful" level={2}/>
    <Node text="and available" level={1}/>
    <Node text="only via" level={2}/>
    <Node text="keyboard" level={2}/>
    <Node text="goo"/>
    <Node text="Item 2"/>
  </div>
)
