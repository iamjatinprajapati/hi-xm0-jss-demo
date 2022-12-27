import React from 'react';
import { Placeholder, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

type DynamicPlaceholderProps = {
  rendering: ComponentRendering;
};

const PartialDesignDynamicPlaceholder = (props: DynamicPlaceholderProps): JSX.Element => {
  // console.log(props);
  return (
    <>
      <span>Dynamic</span>
      <Placeholder name={props.rendering?.params?.sig || ''} rendering={props.rendering} />
    </>
  );
};

export default PartialDesignDynamicPlaceholder;
