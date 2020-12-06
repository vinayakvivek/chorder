import { observer } from 'mobx-react';
import React from "react";
import { useStores } from '../../hooks/store';

const Home = () => {

  const { serviceStore } = useStores();

  return (
    <div>
      <h1>{ serviceStore.id }</h1>
      <h2>Do or Do not. There is no try</h2>
    </div>
  );
}

export default observer(Home);
