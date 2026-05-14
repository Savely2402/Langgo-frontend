declare type RootState = ReturnType<
    (typeof import('./providers/store/store'))['rootReducer']
>
declare type AppDispatch =
    (typeof import('./providers/store/store'))['store']['dispatch']
