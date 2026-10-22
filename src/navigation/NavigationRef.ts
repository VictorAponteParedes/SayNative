import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';
import type { RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const navigate = <RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName],
): void => {
  if (navigationRef.isReady()) {
    (
      navigationRef.navigate as (
        routeName: RouteName,
        params?: RootStackParamList[RouteName]
      ) => void
    )(name, params);
  }
};

export const goBack = (): void => {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
};

export const resetTo = (name: keyof RootStackParamList): void => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name }],
      })
    );
  }
};
