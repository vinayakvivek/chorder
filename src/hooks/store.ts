import React from "react";
import { serviceStore } from '../stores/service';
import { userStore } from '../stores/user';

const storesContext = React.createContext({
  serviceStore,
  userStore,
});

export const useStores = () => React.useContext(storesContext);
