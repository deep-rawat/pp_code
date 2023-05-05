import React, {useEffect} from 'react'
import './App.css';
import Routers from './shared/routers/routers';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyData } from './store/actions/propertyAction';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.propertyData?.loading);
  useEffect(() => {
    dispatch(getPropertyData());
  }, [])

  return(
      <PersistGate persistor={persistor}>
        <React.Suspense>
            {isLoading && <div className="loading d-inline">Loading&#8230;</div>}
          <Routers />
        </React.Suspense>
      </PersistGate>
  );
}

export default App;
